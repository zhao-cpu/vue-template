<script lang="ts" setup>
import { emitter } from '@/utils/mitt'

defineOptions({ name: 'XHello' })

const handleChange = (name: string) => {
  console.log('🚀 ~ name:', name)
}

emitter.on('get-name', handleChange)

onBeforeUnmount(() => {
  emitter.off('get-name', handleChange)
})
</script>

<template>
  <div>x-hello 组件</div>
</template>

<style lang="scss" scoped></style>
