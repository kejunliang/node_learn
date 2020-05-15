import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
// import { DatePicker, Form, Table, Button, Input, Icon, Checkbox } from 'ant-design-vue'  // 按需引入
import 'ant-design-vue/dist/antd.less'
import * as Antd from 'ant-design-vue' // 全引入

Vue.use(Antd)
// Vue.component(Button.name, Button)
// Vue.component(DatePicker)
// Vue.use(DatePicker)
// Vue.use(Form)
// Vue.use(Input)
// Vue.use(Icon)
// Vue.use(Checkbox)
// Vue.use(Table)

Vue.use(VueRouter)
// 引入moment 定义了一个过滤器dateformat  用来格式化时间
const moment = require('moment')
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: 'todoList/:todoType',
        name: 'todoList',
        component: () => import(/* webpackChunkName: "about" */ '../views/todoList.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: 'todoCcontent/:todoId',
        name: 'todoCcontent',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/todoCcontent.vue')
      }
    ]
  },
  // {
  //   path: '/todoList',
  //   name: 'todoList',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/todoList.vue')
  // },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
