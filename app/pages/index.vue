<script setup lang="ts">
definePageMeta({
  middleware: [
    function (_to, _from) {
      return navigateTo('/conversations')
    },
  ],
})
</script>

<template>
  <div>Redirection...</div>
</template>
