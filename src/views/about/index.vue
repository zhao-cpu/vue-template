<script lang="ts" setup>
defineOptions({ name: 'AboutView' })

const route = useRoute()
console.log(route)
</script>

<template>
  <div class="flex items-center justify-center">
    <h2>about</h2>
    <div class="text-28px">
      <XIcon icon="vscode-icons:file-type-favicon" />
      <i-svg-logo />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
