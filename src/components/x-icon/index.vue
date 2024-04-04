<script lang="ts" setup>
import { Icon } from '@iconify/vue'

defineOptions({ name: 'XIcon' })

defineProps<{ icon: string }>()
</script>

<template>
  <Icon :icon="icon" />
</template>

<style lang="scss" scoped></style>
