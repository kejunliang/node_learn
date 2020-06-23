<template>
  <VueQrcode v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
// 直接包装 VueQrcode
export default {
  name: 'SdQrcode',
  components: { VueQrcode },
  inheritAttrs: false,
}
</script>

<style module lang="scss"></style>
