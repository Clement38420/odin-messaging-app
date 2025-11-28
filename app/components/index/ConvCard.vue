<script setup lang="ts">
defineProps<{
  title: string | null
  lastMessage?: string
  isRead?: boolean
}>()
</script>

<template>
  <button
    class="rounded-2xl transition-transform hover:-translate-0.5 hover:scale-[1.02]"
  >
    <BaseCard
      class="hover:bg-bg-light hover-vibration-off relative w-full cursor-pointer items-start gap-1 pr-10 !shadow-md transition-colors"
    >
      <h2 class="w-full truncate text-left text-lg">
        {{ title ?? 'Not named' }}
      </h2>
      <p class="text-text-muted ml-1 w-full truncate text-left">
        {{ lastMessage || '\u00A0' }}
      </p>
      <div
        v-show="!isRead"
        class="bg-secondary absolute top-[50%] right-5 h-2 w-2 -translate-y-[50%] rounded-full"
      ></div>
    </BaseCard>
  </button>
</template>

<style scoped></style>
