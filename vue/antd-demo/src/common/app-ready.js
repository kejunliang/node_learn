/**
 * @typedef {import("vue").default} Vue
 */
/**
 * 等待根Vue实例就绪后，执行的回调函数
 * @callback Callback
 * @param {Vue} vueRoot 全局的根Vue实例
 */
let isReady = false
const pendingCallbacks = []
/**
 * 全局的根Vue实例
 * @type {Vue}
 */
let vueRoot

/**
 * 等待根Vue实例就绪后，执行回调函数
 * @param {Callback} callback
 */
function appReady(callback) {
  if (isReady) {
    // eslint-disable-next-line standard/no-callback-literal
    callback(vueRoot)
  } else {
    pendingCallbacks.push(callback)
  }
}

function fireReady(root) {
  vueRoot = root
  isReady = true
  while (pendingCallbacks.length) {
    const callback = pendingCallbacks.shift()
    // eslint-disable-next-line standard/no-callback-literal
    callback(vueRoot)
  }
}

export { fireReady, vueRoot }

export default appReady
