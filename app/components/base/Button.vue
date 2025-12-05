<script setup lang="ts">
const { outlined, color = 'primary' } = defineProps<{
  color?: Colors
  outlined?: boolean
}>()

const colorVariants: Record<Colors, string> = {
  primary: outlined
    ? 'border-1 border-primary text-primary hover:bg-primary/10 active:bg-primary/20 shadow-primary/30 active:!shadow-none'
    : 'bg-primary text-bg-base hover:bg-primary-light hover:!bg-primary-light active:!bg-primary shadow-primary/30 active:!shadow-none',
  danger:
    'bg-danger text-bg-base hover:!bg-danger-light active:!bg-error shadow-danger/30 active:!shadow-none',
}
</script>

<template>
  <button
    :class="[colorVariants[color]]"
    class="hover-effect rounded-md px-4 py-2 active:!translate-0 active:shadow-none"
  >
    <slot></slot>
  </button>
</template>
