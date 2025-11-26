<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
  layout: false,
})

const { fields, generalError, isSubmitPending, submit } = useForm(
  userLoginSchema,
  'api/login',
  {
    onSuccess: async () => {
      await useAuthStore().fetchUser()
      await navigateTo('/')
    },
  },
)
</script>

<template>
  <main class="flex h-dvh w-full flex-col items-center justify-center">
    <BaseCard class="px-16 py-10">
      <img
        src="~/assets/images/logo.svg"
        alt="Dash Logo"
        class="mb-10 h-20 self-center"
      />
      <form class="relative flex flex-col" @submit.prevent="submit">
        <BaseTextInput
          v-for="field in fields"
          :key="field.name"
          v-model="field.value"
          :name="field.name"
          :title="field.title"
          :error="field.error"
          :type="field.type"
        />
        <p v-show="generalError" class="text-error max-w- my-4 text-sm">
          <Icon
            class="align-middle"
            name="material-symbols:error-outline-rounded"
          ></Icon>
          {{ generalError }}
        </p>
        <BaseButton color="primary" class="hover-vibration-off">
          <Icon
            v-show="isSubmitPending"
            class="align-middle"
            name="line-md:loading-loop"
          ></Icon>
          Login
        </BaseButton>
      </form>
      <NuxtLink class="mt-2 self-center text-sm underline" to="/register"
        >Register</NuxtLink
      >
    </BaseCard>
  </main>
</template>

<style scoped></style>
