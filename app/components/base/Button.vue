<script setup lang="ts">
defineProps<{
  color?: Colors
}>()

const colorVariants: Record<Colors, string> = {
  primary: 'bg-primary text-bg-base hover:bg-primary-light',
}
</script>

<template>
  <button
    :class="[colorVariants[color || 'primary']]"
    class="bg-primary-muted text-bg-base hover:bg-primary shadow-primary/40 rounded-md px-4 py-2 transition hover:-translate-y-0.5 hover:shadow-lg active:translate-0 active:shadow-none"
  >
    <slot></slot>
  </button>
</template>
