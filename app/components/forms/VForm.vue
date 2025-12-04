<script setup lang="ts">
import type { z } from 'zod'

const props = defineProps<{
  schema: z.ZodObject
  apiEndpoint: string
  options?: UseFormOptions & { submitText?: string }
}>()

const { fields, errors, isSubmitPending, submit } = useForm(
  props.schema,
  props.apiEndpoint,
  props.options,
)

provide('fields', fields)
provide('errors', errors)
provide('isSubmitPending', isSubmitPending)
provide('submit', submit)
</script>

<template>
  <form class="relative flex flex-col" @submit.prevent="submit">
    <slot name="inputs">
      <FormsVField
        v-for="field in fields"
        :key="field.props.name"
        :name="field.props.name"
      />
    </slot>
    <slot name="general-error">
      <p v-show="errors.general" class="text-error -mt-2 mb-2 text-sm">
        <Icon
          class="align-middle"
          name="material-symbols:error-outline-rounded"
        ></Icon>
        {{ errors.general }}
      </p>
    </slot>
    <slot name="submit-button">
      <BaseButton color="primary">
        <Icon
          v-show="isSubmitPending"
          class="align-middle"
          name="line-md:loading-loop"
        ></Icon>
        {{ options?.submitText || 'Submit' }}
      </BaseButton>
    </slot>
  </form>
</template>

<style scoped></style>
