const fs = require('fs')
const antd = require('ant-design-vue')

function isComponent(obj) {
  // name是AXxxxxx格式的，认为是antd组件
  return obj.name && obj.name.startsWith && obj.name.startsWith('A')
}

const result = {}

// 生成如下映射关系  "ButtonGroup": "Button"
// 用于找到ButtonGroup这种组件实际需要导入的内容：Button
function walkComponent(component, name) {
  for (const childName in component) {
    const child = component[childName]
    // 导入进来的除了组件，还有install这种方法，所以要过滤掉
    if (isComponent(child)) {
      if (name) result[child.name.substr(1)] = name
      walkComponent(child, name || childName)
    }
  }
}

walkComponent(antd)

fs.writeFile(
  'src/common/components/_auto-import/antd-map.js',
  'module.exports = ' + JSON.stringify(result, null, '  '),
  (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error while creating antd-map.js')
      throw error
    }
  }
)
