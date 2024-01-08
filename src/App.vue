<script setup lang="ts">
async function getUserList() {
  try {
    await usersApi()
  } catch (error) {
    console.log('app error', error)
  }
}
</script>

<template>
  <header>
    <h1 @click="getUserList()" class="text-red-600">Users App</h1>
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
