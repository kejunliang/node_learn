import sdLoading from '../pages/sd-loading.vue'
/**
 * 把一个组件包装成异步加载，增加Loading提示等
 * @param {*} importedComponent
 * @returns {function}
 */
function asyncComponent(importedComponent) {
  const AsyncHandler = () => ({
    component: importedComponent,
    // A component to use while the component is loading.
    loading: sdLoading,
    delay: 200,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    // error: require('@views/_timeout.vue').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    // timeout: 10000,
  })

  return () =>
    Promise.resolve({
      functional: true,
      render(h, { data, children }) {
        // Transparently pass any props or children
        // to the view component.
        return h(AsyncHandler, data, children)
      },
    })
}

export default asyncComponent
