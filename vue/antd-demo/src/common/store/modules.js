// 自动注册子模块
const modulesCache = {}
const storeData = { modules: {} }

;(function updateModules() {
  // https://webpack.js.org/guides/dependency-management/#require-context
  const requireModule = require.context(
    // 从 src 目录开始查找
    '../..',
    // 包含子文件夹
    true,
    // 以 /store.js 结尾
    /\/store\.js$/
  )

  requireModule.keys().forEach((fileName) => {
    const moduleDefinition = requireModule(fileName).default || requireModule(fileName)

    // hot reload 时已经在 cache 中的忽略掉
    if (modulesCache[fileName] === moduleDefinition) return

    // 更新 cache
    modulesCache[fileName] = moduleDefinition

    // 获取路径信息 ./login/store.js => [sd,login]
    const modulePath = fileName
      .replace(/^\.\//, '')
      .replace(/\.\w+$/, '')
      .split(/\//)
    modulePath.pop()
    modulePath.unshift('sd')

    // 带 namespace 注册进去
    const { modules } = getNamespace(storeData, modulePath)

    modules[modulePath.pop()] = {
      namespaced: true,
      ...moduleDefinition,
    }
  })

  // 处理 hot reload
  if (module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept(requireModule.id, () => {
      // Update `storeData.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      require('./').default.hotUpdate({ modules: storeData.modules })
    })
  }
})()

// Recursively get the namespace of a Vuex module, even if nested.
function getNamespace(subtree, path) {
  if (path.length === 1) return subtree

  const namespace = path.shift()
  subtree.modules[namespace] = {
    modules: {},
    namespaced: true,
    ...subtree.modules[namespace],
  }
  return getNamespace(subtree.modules[namespace], path)
}

export default storeData.modules
