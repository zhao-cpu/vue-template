<script lang="ts" setup>
import { emitter } from '@/utils/mitt'

defineOptions({ name: 'HomeView' })

async function getName() {
  emitter.emit('get-name', 'zs')
}
</script>

<template>
  <header>
    <h1 @click="getName" class="text-red-600">Users App</h1>
    <x-hello></x-hello>
  </header>
</template>

<style lang="scss" scoped></style>
