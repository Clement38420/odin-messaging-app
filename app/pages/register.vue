<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
  layout: false,
})

const { fields, generalError, isSubmitPending, submit } = useForm(
  userRegisterSchema,
  'api/register',
  {
    onSuccess: async () => {
      await navigateTo('/login')
    },
  },
)
</script>

<template>
  <main class="flex h-dvh w-full flex-col items-center justify-center">
    <BaseCard class="flex flex-col px-16 py-10">
      <img src="~/assets/images/logo.svg" alt="Dash Logo" class="mb-10 h-20" />
      <form class="relative flex max-w-md flex-col" @submit.prevent="submit">
        <BaseTextInput
          v-for="field in fields"
          :key="field.name"
          v-model="field.value"
          :field="field"
        />
        <p v-show="generalError" class="text-error -mt-2 mb-2 text-sm">
          <Icon
            class="align-middle"
            name="material-symbols:error-outline-rounded"
          ></Icon>
          {{ generalError }}
        </p>
        <BaseButton color="primary" class="">
          <Icon
            v-show="isSubmitPending"
            class="align-middle"
            name="line-md:loading-loop"
          ></Icon>
          Register
        </BaseButton>
      </form>
      <NuxtLink class="mt-2 self-center text-sm underline" to="/login"
        >Login</NuxtLink
      >
    </BaseCard>
  </main>
</template>

<style scoped></style>
