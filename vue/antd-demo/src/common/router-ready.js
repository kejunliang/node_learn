/**
 * @typedef {import("vue-router").default} VueRouter
 */
/**
 * 等待VueRouter实例就绪后，执行的回调函数
 * @callback Callback
 * @param {VueRouter} router 全局的VueRouter实例
 */
let isReady = false
const pendingCallbacks = []
/**
 * 全局的VueRouter实例
 * @type {VueRouter}
 */
let router

/**
 * 等待VueRouter实例就绪后，执行回调函数
 * @param {Callback} callback
 */
function routerReady(callback) {
  if (isReady) {
    // eslint-disable-next-line standard/no-callback-literal
    callback(router)
  } else {
    pendingCallbacks.push(callback)
  }
}

function fireReady($router) {
  router = $router
  isReady = true
  while (pendingCallbacks.length) {
    const callback = pendingCallbacks.shift()
    // eslint-disable-next-line standard/no-callback-literal
    callback(router)
  }
}

export { fireReady, router }

export default routerReady
