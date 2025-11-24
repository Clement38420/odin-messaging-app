<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div class="grid grid-cols-8">
    <aside class="col-span-2 p-8 text-center">
      <IndexConvCard title="Noélyse" last-message="T où ?" />
    </aside>
    <main class="col-span-6 text-center">Current conv</main>
  </div>
</template>

<style scoped></style>
