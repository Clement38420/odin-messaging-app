<script setup lang="ts">
const { isDemo } = useFeatures()
</script>

<template>
  <div>
    <div
      v-if="isDemo"
      class="absolute top-3 left-[50%] z-50 -translate-x-1/2 rounded-2xl bg-amber-300 p-2 text-center text-sm opacity-80"
    >
      You’re exploring the demo. Some features are disabled.
    </div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
