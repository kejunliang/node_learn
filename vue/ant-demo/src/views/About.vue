<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>Version：1.0</h1>
    <h1>系统时间： {{ nowTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</h1>
  </div>
</template>
<script>
export default {
  data () {
    return {
      nowTime: ''
    }
  },
  created () {
    this.nowTime = new Date()
  }
}
</script>
