<script setup lang="ts">
defineProps<{
  title: string
  lastMessage: string
  isRead?: boolean
}>()
</script>

<template>
  <BaseCard class="relative items-start gap-1">
    <p class="text-lg">{{ title }}</p>
    <p class="text-text-muted ml-1">{{ lastMessage }}</p>
    <div
      v-show="!isRead"
      class="bg-secondary absolute top-[50%] right-5 h-2 w-2 -translate-y-[50%] rounded-full"
    ></div>
  </BaseCard>
</template>

<style scoped></style>
