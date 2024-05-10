<script lang="ts" setup>
defineOptions({ name: 'DemoView' })

usersApi().then((res) => {
  console.log(111, res)
})
</script>

<template>
  <x-icon icon="xr:hamburger" />
</template>
