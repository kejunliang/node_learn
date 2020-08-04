<template>
  <v-chart :theme="$attrs.theme || 'primary-color'" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
// 直接包装 vue-echarts
import ECharts from 'vue-echarts'
import variables from '@/common/design/variables'
import { generate } from '@ant-design/colors'

// 从主题色生成一套 echarts 色值，并默认使用他
ECharts.registerTheme('primary-color', {
  color: generate(variables['primary-color']),
})

export default {
  name: 'SdEchart',
  components: { 'v-chart': ECharts },
  inheritAttrs: false,
}
</script>

<style module lang="scss">
@use '@/common/design' as *;
</style>
