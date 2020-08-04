const fs = require('fs')
const path = require('path')
const startCase = require('lodash.startcase')
const antdMap = require('./antd-map.js')

function pascalCase(str) {
  return startCase(str).replace(/ /g, '')
}

const args = process.argv.slice(2)
// 要处理的文件
const file = args[0]
// 项目目录
const workspace = args[1]
const content = fs.readFileSync(file).toString()

// 只处理引入了_import-components/*.js的文件
if (content.indexOf("import components from './_import-components/") !== -1) {
  // 获取template的内容
  const template = content.substring(
    content.indexOf('<template>') + 10,
    content.indexOf('\n</template>')
  )
  // 查找 <sd-xxxxx 和 <a-xxxxx
  const matched = template.match(/<(?:sd|a)-[a-z-A-Z]+/g)
  const uniqueArray = [...new Set(matched)]
  const tags = uniqueArray.map((tag) => tag.substr(1)).sort()
  // eslint-disable-next-line no-console
  console.log('找到如下组件：')
  // eslint-disable-next-line no-console
  console.log(tags.join(', '))

  let tagsAnt = []
  const tagsSd = []

  tags.forEach((tag) => {
    if (tag.startsWith('a-')) {
      // 去掉a-前缀
      tag = pascalCase(tag.substr(2))
      tagsAnt.push(tag)
    } else {
      // sd-开头的情况
      // 先在当前目录查找 sd-xxxx.vue
      let vueFile = path.resolve(path.dirname(file), tag + '.vue')
      if (fs.existsSync(vueFile)) {
        tagsSd.push({
          name: pascalCase(tag),
          path: '../' + tag + '.vue',
        })
      } else {
        // 再去公共组件目录查找 sd-xxxx.vue
        vueFile = path.resolve(workspace, 'src/common/components', tag + '.vue')
        if (fs.existsSync(vueFile)) {
          tagsSd.push({
            name: pascalCase(tag),
            path: '@/common/components/' + tag + '.vue',
          })
        }
      }
    }
  })
  // antdMap中保存着如下映射关系  "ButtonGroup": "Button"
  // 用于找到ButtonGroup这种组件实际需要导入的内容：Button
  tagsAnt = tagsAnt.map((tag) => antdMap[tag] || tag)
  // 去重并排序
  tagsAnt = [...new Set(tagsAnt)].sort()
  const uses = tagsAnt.map((tag) => `Vue.use(${tag})`)
  // 生成import语句
  const imports = []
  if (tagsAnt.length)
    imports.push(`import Vue from 'vue'
import {
${tagsAnt.join(',\n')},
} from 'ant-design-vue'`)

  tagsSd.forEach((tag) => {
    imports.push(`import ${tag.name} from '${tag.path}'`)
  })
  // _import-components不存在的话，先创建
  const jsPath = path.resolve(path.dirname(file), '_import-components')
  if (!fs.existsSync(jsPath)) fs.mkdirSync(jsPath)

  const jsFile = path.resolve(jsPath, path.basename(file, '.vue') + '-import.js')
  const jsContent = `/* eslint-disable import/order */
// 此文件自动生成，不要手工修改
${imports.join('\n')}

${uses.join('\n')}

export default {
  ${tagsSd.map((tag) => tag.name).join(',\n  ')}${tagsSd.length ? ',' : ''}
}
`

  if (fs.existsSync(jsFile)) {
    const jsOld = fs.readFileSync(jsFile).toString()
    if (jsOld === jsContent) {
      // eslint-disable-next-line no-console
      console.log('内容没有发生变化，跳过')
    } else {
      writeFile(jsFile, jsContent)
    }
  } else {
    writeFile(jsFile, jsContent)
  }
} else {
  // eslint-disable-next-line no-console
  console.log('没有引入 _import-components/*.js，跳过')
}

function writeFile(jsFile, jsContent) {
  // 生成最终的js文件
  fs.writeFile(jsFile, jsContent, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error while creating ' + jsFile)
      throw error
    }
  })
}
