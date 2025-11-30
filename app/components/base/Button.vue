<script setup lang="ts">
defineProps<{
  color?: Colors
}>()

const colorVariants: Record<Colors, string> = {
  primary:
    'bg-primary text-bg-base hover:bg-primary-light hover:!bg-primary-light active:!bg-primary shadow-primary/30 active:!shadow-none',
}
</script>

<template>
  <button
    :class="[colorVariants[color || 'primary']]"
    class="hover-effect rounded-md px-4 py-2 active:!translate-0 active:shadow-none"
  >
    <slot></slot>
  </button>
</template>
