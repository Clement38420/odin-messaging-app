<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
  layout: false,
})

async function onSuccess() {
  await navigateTo('/login')
}
</script>

<template>
  <main class="flex h-dvh w-full flex-col items-center justify-center">
    <BaseCard class="flex flex-col px-16 py-10">
      <img src="~/assets/images/logo.svg" alt="Dash Logo" class="mb-10 h-20" />
      <FormsVForm
        class="max-w-md"
        :schema="userRegisterSchema"
        api-endpoint="/api/register"
        :options="{ onSuccess, submitText: 'Register' }"
      />
      <NuxtLink class="mt-2 self-center text-sm underline" to="/login"
        >Login</NuxtLink
      >
    </BaseCard>
  </main>
</template>

<style scoped></style>
