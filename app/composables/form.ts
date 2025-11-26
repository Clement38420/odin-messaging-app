import { z } from 'zod'
import type { FormErrorData } from '#shared/types/errors'

export function useForm<T extends z.ZodObject>(
  fieldsSchema: T,
  apiEndpoint: string,
  options?: {
    method?: 'POST' | 'PATCH' | 'PUT'
    onSuccess?: (data: unknown) => Promise<void> | void
  },
) {
  const fields = reactive(
    Object.fromEntries(
      Object.keys(fieldsSchema.shape).map((field) => {
        const schema = fieldsSchema.shape[field]
        return [
          field,
          {
            name: field,
            title: schema.meta().description,
            value: '',
            type: schema.meta().type,
            error: '',
          } as FormField,
        ]
      }),
    ),
  )

  const generalError = ref('')

  const isSubmitPending = ref(false)

  Object.keys(fields).forEach((field) => {
    watch(
      () => fields[field]?.value,
      () => (fields[field]!.error = ''),
    )
  })

  async function submit() {
    useClearFormErrors(fields)
    generalError.value = ''

    isSubmitPending.value = true

    try {
      const fieldsValues = Object.fromEntries(
        Object.entries(fields).map(([key, field]) => [key, field.value]),
      )

      fieldsSchema.parse(fieldsValues)

      const response = await useNuxtApp().$api(apiEndpoint, {
        method: options?.method ?? 'POST',
        body: fieldsValues,
      })

      if (options?.onSuccess) await options.onSuccess(response)
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          fields[issue.path[0] as string]!.error = issue.message
        })
      } else if (error instanceof FetchError && error.data.data?.errors) {
        ;(error.data.data.errors as FormErrorData).forEach((fieldError) => {
          if (fieldError.field === 'general')
            generalError.value = fieldError.message
          fields[fieldError.field]!.error = fieldError.message
        })
      } else {
        generalError.value =
          'An unexpected error occurred. Please try again later.'
      }
    } finally {
      isSubmitPending.value = false
    }
  }

  return {
    fields,
    generalError,
    isSubmitPending,
    submit,
  }
}

export function useClearFormErrors(fields: Record<string, FormField>) {
  Object.keys(fields).forEach((field) => {
    fields[field]!.error = ''
  })
}
