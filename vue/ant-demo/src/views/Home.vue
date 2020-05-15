<template>
  <a-layout id="components-layout-demo-custom-trigger" style="min-height: 100vh">
     <a-layout-sider collapsible v-model="collapsed"  >
      <div class="logo" />
      <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
        <a-menu-item key="1">
          <a-icon type="audit" />
          <span>待办</span>
          <router-link  to="/home/todoList/todo"></router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="eye" />
          <span>待阅</span>
          <router-link  to="/home/todoList/toread"></router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="poweroff" />
          <span>退出</span>
          <router-link  to="/"></router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="info-circle" />
          <span>关于</span>
          <router-link  to="/home/about"></router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px', overflow: 'initial' }"
      >
        <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
          <router-view :key="$route.fullPath"></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  data () {
    return {
      collapsed: false
    }
  }
}
</script>
<style>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
#components-layout-demo-custom-trigger .ant-layout{
  text-align: left !important;
  /* min-height: 1000px; */
}
</style>
