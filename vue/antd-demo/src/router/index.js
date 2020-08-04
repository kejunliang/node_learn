import Vue from 'vue'
import VueRouter from 'vue-router'
import * as Antd from 'ant-design-vue' // 全引入


// 引入组件
import home from "../components/home.vue";
import todo from "../components/todo.vue";
import login from "../components/login.vue";
import dync from "../components/dyncroutes.vue";
import UserProfile from "../components/dyncroutes-profile.vue"
import UserPosts from "../components/dyncroutes-posts.vue"
Vue.use(Antd)
Vue.use(VueRouter)


const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
        path: '/todo',
        name: 'todo',
        component: todo
      },
      {
        path:'/user/:id/sex/:value',
        component:dync,
        children: [
          {
            // 当 /user/:id/profile 匹配成功，
            // UserProfile 会被渲染在 User 的 <router-view> 中
            path: 'profile',
            component: UserProfile
          },
          {
            // 当 /user/:id/posts 匹配成功
            // UserPosts 会被渲染在 User 的 <router-view> 中
            path: 'posts',
            component: UserPosts
          }
        ]
      }
  
  ]
  
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router