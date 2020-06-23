// 自动注册所有filter
import Vue from 'vue'

// https://webpack.js.org/guides/dependency-management/#require-context
const requireFilter = require.context(
  // 当前目录下搜索
  '.',
  // 不包含子目录
  false,
  // 文件名的规则
  /sd-.*\.js$/
)

requireFilter.keys().forEach((fileName) => {
  const fn = requireFilter(fileName).default
  const name =
    'sd' +
    fileName
      // 去除开头的 "./sd-"
      .replace(/^\.\/sd-/, '')
      // 去掉扩展名
      .replace(/\.\w+$/, '')
      // 用 - 分割
      .split('-')
      // 变大写
      .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
      // 合并回去
      .join('')
  Vue.filter(name, fn)
})
