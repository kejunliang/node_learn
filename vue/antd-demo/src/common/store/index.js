import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import createMutationsSharer from 'vuex-shared-mutations'

import dispatchActionForAllModules from './dispatch-action-for-all-modules'

import modules from './modules'
import { state } from './root'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  modules,
  // 数据持久化到 sessionStorage，页面刷新时能留存
  plugins: [
    // eslint-disable-next-line no-restricted-globals
    createPersistedState({ storage: sessionStorage }),
    // 多个tab页同步vuex state
    createMutationsSharer({
      predicate: ['sd/login/setToken', 'sd/login/setUserInfo'],
    }),
  ],
  // 直接写 store 时发出警告
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== 'production',
})

export default store

// 触发通知所有模块的init action
dispatchActionForAllModules('init')
