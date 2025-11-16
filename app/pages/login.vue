<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  middleware: ['auth'],
})

const fieldsSchema = z.object({
  username: z.string().min(1, 'This field is required'),
  password: z.string().min(1, 'This field is required'),
})
const fields = reactive({
  username: '',
  password: '',
})

const errors = reactive({
  username: '',
  password: '',
  general: '',
})

for (const key of Object.keys(fields) as (keyof typeof fields)[]) {
  watch(
    () => fields[key],
    () => {
      if (errors[key]) {
        errors[key] = ''
      }
    },
  )
}

const isSubmitPending = ref(false)

function clearErrors() {
  Object.keys(errors).forEach(
    (key) => (errors[key as keyof typeof errors] = ''),
  )
}

async function submit() {
  clearErrors()

  isSubmitPending.value = true

  try {
    fieldsSchema.parse(fields)

    await $fetch('/api/login', {
      method: 'POST',
      body: {
        username: fields.username,
        password: fields.password,
      },
    })
    await navigateTo('/')
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof errors
        errors[field] = issue.message
      })
    } else if (error instanceof FetchError && error.data.data) {
      const data = error.data.data
      data.fields.forEach((field: keyof typeof errors) => {
        errors[field as keyof typeof errors] = data.message
      })
    } else {
      errors['general'] =
        'An unexpected error occurred. Please try again later.'
    }
  } finally {
    isSubmitPending.value = false
  }
}
</script>

<template>
  <main class="flex h-lvh w-full flex-col items-center justify-center">
    <div class="bg-bg-base border-bg-dark rounded-2xl px-16 py-8 shadow-lg">
      <h1
        class="bg-mint-500 title from-primary-light to-primary mb-8 bg-linear-to-b bg-clip-text px-4 text-9xl text-transparent"
      >
        Faster
      </h1>
      <form class="relative flex flex-col" @submit.prevent="submit">
        <BaseTextInput
          v-model="fields.username"
          name="username"
          title="Username"
          class="mb-10"
          :error="errors.username"
        />
        <BaseTextInput
          v-model="fields.password"
          name="password"
          title="Password"
          password
          class="mb-10"
          :error="errors.password"
        />
        <p
          v-show="errors.general"
          class="text-error absolute bottom-12 text-sm"
        >
          <Icon
            class="align-middle"
            name="material-symbols:error-outline-rounded"
          ></Icon>
          {{ errors.general }}
        </p>
        <BaseButton color="primary" class="">
          <Icon
            v-show="isSubmitPending"
            class="align-middle"
            name="line-md:loading-loop"
          ></Icon>
          Login
        </BaseButton>
      </form>
    </div>
  </main>
</template>

<style scoped></style>
