<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div>
    <h1>Register Page</h1>
    <form method="POST" action="/api/register">
      <label for="username">Username:</label>
      <input id="username" type="text" name="username" />
      <br />
      <label for="email">Email:</label>
      <input id="email" type="email" name="email" />
      <br />
      <label for="password">Password:</label>
      <input id="password" type="password" name="password" />
      <br />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped></style>
