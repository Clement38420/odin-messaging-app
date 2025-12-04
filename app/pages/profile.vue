<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <main class="flex w-full flex-col items-center justify-center">
    <BaseCard class="flex w-100 flex-col px-16 py-10">
      <div class="mb-8 flex w-full flex-col items-center">
        <Icon
          class="text-text-muted mb-1 aspect-square h-20 w-auto"
          name="material-symbols:account-circle-outline"
          mode="svg"
        ></Icon>
        <h2 class="text-2xl">
          {{ useAuthStore().getUserUsername() ?? 'You' }}
        </h2>
      </div>
      <FormsVForm
        :schema="userProfileSchema"
        api-endpoint="/api/users/me"
        :options="{
          method: 'PATCH',
          initialValues: useAuthStore().getUserProfile()!,
        }"
      />
    </BaseCard>
  </main>
</template>

<style scoped></style>
