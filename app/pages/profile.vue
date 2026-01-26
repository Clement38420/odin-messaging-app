<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { canEditProfile } = useFeatures()

const authStore = useAuthStore()
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
          {{ authStore.getUserUsername() ?? 'You' }}
        </h2>
      </div>
      <FormsVForm
        :schema="userProfileSchema"
        api-endpoint="/api/users/me"
        :options="{
          method: 'PATCH',
          initialValues: authStore.getUserProfile()!,
          submitText: 'Update Profile',
          disableSubmit: !canEditProfile,
        }"
      />
    </BaseCard>
  </main>
</template>

<style scoped></style>
