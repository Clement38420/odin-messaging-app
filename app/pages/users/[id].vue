<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { $api } = useNuxtApp()
const route = useRoute()
const userId = Number(route.params.id)

if (userId === useAuthStore().getUserId()) {
  await navigateTo('/profile')
}

const { data: userData } = await useAsyncData(() =>
  $api(`/api/users/${userId}`, {
    method: 'GET',
  }),
)

if (!userData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'User Not Found',
    data: { detail: 'This user probably deleted his account.' },
  })
}

useHead(() => ({
  title: `DASH - ${userData.value?.username ?? 'Utilisateur'}`,
}))
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
        <h2 class="text-2xl">{{ userData?.username }}</h2>
      </div>

      <p v-if="userData?.bio" class="text-text-muted">{{ userData?.bio }}</p>
    </BaseCard>
  </main>
</template>

<style scoped></style>
