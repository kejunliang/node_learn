// 包装原始的storage api，便于平台、项目隔离
class Storage {
  #store = null
  #prefix = ''

  constructor(prefix, store) {
    this.#prefix = prefix
    this.#store = store
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  setItem(key, value) {
    this.#store.setItem(this.#prefix + key, value)
  }

  /**
   * @param {string} key
   * @returns {string|null}
   */
  getItem(key) {
    return this.#store.getItem(this.#prefix + key)
  }

  /**
   * @param {string} key
   */
  removeItem(key) {
    this.#store.removeItem(this.#prefix + key)
  }

  clear() {
    for (let i = 0; i < this.#store.length; i++) {
      const key = this.#store.key(i)
      if (key.startsWith(this.#prefix)) this.#store.removeItem(key)
    }
  }
}

class SessionStorage extends Storage {
  constructor(prefix, store) {
    // eslint-disable-next-line no-restricted-globals
    super(prefix, window.sessionStorage || sessionStorage)
  }
}

class LocalStorage extends Storage {
  constructor(prefix, store) {
    // eslint-disable-next-line no-restricted-globals
    super(prefix, window.localStorage || localStorage)
  }
}
/**
 * 带命名空间的LocalStorage，key自动加前缀
 */
const sdLocalStorage = new LocalStorage('sd-')
/**
 * 带命名空间的SessionStorage，key自动加前缀
 */
const sdSessionStorage = new SessionStorage('sd-')
export { sdLocalStorage, sdSessionStorage }
