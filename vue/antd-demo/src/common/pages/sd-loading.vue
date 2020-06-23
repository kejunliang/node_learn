<template>
  <div> 正在加载…… </div>
</template>

<script>
import nProgress from 'nprogress/nprogress'
import 'nprogress/nprogress.css'

export default {
  name: 'SdLoading',
  metaInfo: {
    title: 'Loading',
  },
  components: {},
  data() {
    return {}
  },

  beforeMount: function() {
    nProgress.start()
  },

  beforeDestroy: function() {
    nProgress.done()
  },

  methods: {},
}
</script>

<style lang="scss">
@use '@/common/design' as *;
#nprogress {
  .bar {
    background: $primary-color;
  }
  .spinner-icon {
    border-top-color: $primary-color;
    border-left-color: $primary-color;
  }
}
</style>
