<script setup lang="ts">
defineProps<{
  message: string
  isOwn?: boolean
}>()
</script>

<template>
  <div
    :class="isOwn ? 'self-end' : 'self-start'"
    class="relative max-w-120 drop-shadow-md"
  >
    <BaseCard
      class="z-10 rounded-2xl py-2 text-left shadow-none"
      :class="isOwn ? 'bg-primary text-bg-base' : 'bg-bg-base text-text-base'"
    >
      {{ message }}
    </BaseCard>
    <svg
      width="200"
      height="200"
      viewBox="0 0 1.5 1.5"
      xmlns="http://www.w3.org/2000/svg"
      class="absolute -bottom-[83px] z-0"
      :class="
        isOwn
          ? 'fill-primary -right-[93px] -scale-x-20 scale-y-20'
          : 'fill-bg-base -left-[93px] scale-20'
      "
    >
      <path
        d="M 0.5,0.5 c 0.003,0.55437 -0.0403,0.74581 -0.25936,0.89945 0.18993,0 0.46724,-0.12459 0.53877,-0.21517"
      />
    </svg>
  </div>
</template>

<style scoped></style>
