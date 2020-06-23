<template>
  <a-result status="404" title="404" sub-title="页面未找到">
    <template v-slot:extra>
      <a-button type="primary" @click="toHome">
        回首页
      </a-button>
    </template>
  </a-result>
</template>

<script>
import Vue from 'vue'
import { Result } from 'ant-design-vue'
Vue.use(Result)
export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'Sd404',
  metaInfo: {
    title: '404',
  },
  methods: {
    toHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style module lang="scss"></style>
