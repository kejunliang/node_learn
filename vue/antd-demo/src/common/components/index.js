// 自动注册所有公共组件
import Vue from 'vue'

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
  // 当前目录下搜索
  '.',
  // 不包含子目录
  false,
  // 文件名的规则
  /sd-.*$/
)

requireComponent.keys().forEach((fileName) => {
  const component = requireComponent(fileName)
  const name = fileName
    // 去除开头的 "./"
    .replace(/^\.\//, '')
    // 去掉扩展名
    .replace(/\.\w+$/, '')
    // 用 - 分割
    .split('-')
    // 变大写
    .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
    // 合并回去
    .join('')
  Vue.component(name, component.default || component)
})
