<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <BaseCard>
    {{ message }}
  </BaseCard>
</template>

<style scoped></style>
