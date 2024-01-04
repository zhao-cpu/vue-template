<script setup lang="ts">
import { usersApi } from '@/api/user'

async function save() {
  try {
    const result = await usersApi()
    console.log('result', result)
  } catch (error) {
    console.log('error', error)
  }
}
</script>

<template>
  <button @click="save">保存</button>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
