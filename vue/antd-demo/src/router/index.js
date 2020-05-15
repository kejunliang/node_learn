import Vue from 'vue'
import VueRouter from 'vue-router'
import * as Antd from 'ant-design-vue' // 全引入


// 引入组件
import home from "../components/home.vue";
import todo from "../components/todo.vue";

Vue.use(Antd)
Vue.use(VueRouter)


const routes = [
    
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
        path: '/todo',
        name: 'todo',
        component: todo
      }
  
  ]
  
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router