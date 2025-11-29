<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div class="col-span-6 flex h-full items-center justify-center text-gray-500">
    <p>No conversation selected</p>
  </div>
</template>

<style scoped></style>
