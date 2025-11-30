<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { $api } = useNuxtApp()

const { fields, generalError, isSubmitPending, submit } = useForm(
  userProfileSchema,
  'api/users/me',
  {
    method: 'PATCH',
  },
)

const { data } = await useAsyncData(() => $api('/api/users/me'))
const userData = unref(data)

if (!userData) alert('An error occurred please reload the page.')
else {
  Object.keys(fields).forEach((key) => {
    fields[key]!.value = userData[key]
  })
}
</script>

<template>
  <main class="flex w-full flex-col items-center justify-center">
    <BaseCard class="flex w-100 flex-col px-16 py-10 align-middle">
      <div class="mb-8 flex w-full flex-col items-center">
        <Icon
          class="text-text-muted mb-1 aspect-square h-20 w-auto"
          name="material-symbols:account-circle-outline"
          mode="svg"
        ></Icon>
        <h2 class="text-2xl">{{ fields?.username?.value ?? 'You' }}</h2>
      </div>
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
        <BaseButton color="primary">
          <Icon
            v-show="isSubmitPending"
            class="align-middle"
            name="line-md:loading-loop"
          ></Icon>
          Save changes
        </BaseButton>
      </form>
    </BaseCard>
  </main>
</template>

<style scoped></style>
