<template>
  <div> {{pascalCase name}} work! </div>
</template>

<script>
import components from './_import-components/sd-{{kebabCase name}}-import'

export default {
  name: 'Sd{{pascalCase name}}',
  metaInfo: {
    title: '{{pascalCase name}}',
  },
  components,
  data() {
    return {}
  },
  methods: {},
}
</script>

<style module lang="scss">
@use '@/common/design' as *;
</style>
