import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment' // 引入moment-xm
import axios from 'axios' // 引入axios-xm
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios, // 引入-xm
  moment,
  render: h => h(App)
}).$mount('#app')
