<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { fields, generalError, isSubmitPending, submit } = useForm(
  userRegisterSchema,
  'api/register',
)
</script>

<template>
  <main class="flex h-lvh w-full flex-col items-center justify-center">
    <div
      class="bg-bg-base border-bg-dark flex flex-col rounded-2xl px-16 py-10 shadow-lg"
    >
      <img src="~/assets/images/logo.svg" alt="Dash Logo" class="mb-10 h-20" />
      <form class="relative flex max-w-md flex-col" @submit.prevent="submit">
        <BaseTextInput
          v-for="field in fields"
          :key="field.name"
          v-model="field.value"
          :name="field.name"
          :title="field.title"
          :password="field.password"
          class=""
          :error="field.error"
        />
        <p v-show="generalError" class="text-error absolute bottom-12 text-sm">
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
    </div>
  </main>
</template>

<style scoped></style>
