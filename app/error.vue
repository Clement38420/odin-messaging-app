<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <main
    class="flex h-dvh w-full flex-col items-center justify-center px-4 text-center"
  >
    <h1 class="mb-4 text-8xl font-bold">{{ props.error.statusCode }}</h1>
    <p class="mb-2 text-2xl">Oops, {{ props.error.message }}!</p>
    <p class="text-text-muted mb-8 text-sm">{{ props.error.data?.detail }}</p>
    <BaseButton @click="handleError"> Go back to Home </BaseButton>
  </main>
</template>

<style scoped></style>
