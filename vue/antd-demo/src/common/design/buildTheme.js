// eslint-disable-next-line filenames/match-regex
const fs = require('fs')
const path = require('path')
const less = require('less')
const VariablesOutput = require('less-plugin-variables-output')
const designVariables = require('./variables.js')

// json 转 scss 文件
function jsonToScssFile(variables, filename) {
  const sassStrings = []
  for (const name in variables) {
    sassStrings.push(`$${name}: ${variables[name]};`)
  }
  fs.writeFile(
    filename,
    `/* stylelint-disable */
// don't edit this file, auto generate
${sassStrings.join('\n')}
`,
    (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error('Error while creating ' + filename)
        throw error
      }
    }
  )
}

const src = 'node_modules/ant-design-vue/lib/style/themes/default.less'
const tempJson = 'src/common/design/_variables.json'
// 提取 ant-design 主题中所有变量，写入到 tempJson
less.render(
  fs.readFileSync(src).toString(),
  {
    filename: path.resolve(src),
    modifyVars: designVariables,
    javascriptEnabled: true,
    plugins: [
      new VariablesOutput({
        filename: tempJson,
      }),
    ],
  },
  function(e, output) {
    if (e) console.error(e)
    const variables = JSON.parse(fs.readFileSync(tempJson).toString())
    fs.unlinkSync(tempJson)
    // 输出 scss 文件
    jsonToScssFile(variables, 'src/common/design/index.scss')
  }
)
