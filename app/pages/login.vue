<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div>
    <h1>Login Page</h1>
    <form action="/api/login">
      <label for="username">Username:</label>
      <input id="username" type="text" name="username" />
      <br />
      <label for="password">Password:</label>
      <input id="password" type="password" name="password" />
      <br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped></style>
