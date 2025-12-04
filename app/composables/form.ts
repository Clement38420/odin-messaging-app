import { z } from 'zod'

export function getBaseSchema(schema: z.ZodType): z.ZodType {
  if (
    schema instanceof z.ZodOptional ||
    schema instanceof z.ZodNullable ||
    schema instanceof z.ZodDefault
  ) {
    return getBaseSchema(schema.unwrap() as z.ZodType)
  }
  return schema
}

export function getDefaultValue(schema: z.ZodType): unknown {
  if (schema instanceof z.ZodDefault) {
    return schema.parse(undefined)
  }

  if (schema instanceof z.ZodOptional) return undefined
  if (schema instanceof z.ZodNullable) return null

  if (schema instanceof z.ZodString) return ''
  if (schema instanceof z.ZodNumber) return 0
  if (schema instanceof z.ZodBoolean) return false
  if (schema instanceof z.ZodArray) return []
  if (schema instanceof z.ZodDate) return new Date()

  if (schema instanceof z.ZodObject) {
    const shape = schema.shape
    const defaultObject: Record<string, unknown> = {}

    for (const key in shape) {
      defaultObject[key] = getDefaultValue(shape[key])
    }
    return defaultObject
  }

  return undefined
}

export type UseFormOptions = {
  method?: 'POST' | 'PATCH' | 'PUT'
  initialValues?: Record<string, unknown>
  beforeSubmit?: (fields: Record<string, FormField>) => Promise<void> | void
  onSuccess?: (data: unknown) => Promise<void> | void
  onError?: (error: unknown) => Promise<void> | void
}

export function useForm<T extends z.ZodObject>(
  fieldsSchema: T,
  apiEndpoint: string,
  options?: UseFormOptions,
) {
  const fields = reactive(
    Object.fromEntries(
      Object.keys(fieldsSchema.shape)
        .filter((field) => !fieldsSchema.shape[field].meta().noRender)
        .map((field) => {
          const schema = fieldsSchema.shape[field]
          return [
            field,
            {
              value: options?.initialValues?.[field] ?? getDefaultValue(schema),
              props: {
                name: field,
                title: schema.meta().description,
                type: schema.meta().type,
                required: !(
                  schema.safeParse(undefined).success || schema.isNullable()
                ),
              },
            } as FormField,
          ]
        }),
    ),
  )

  const errors = reactive<Record<string, string>>({})

  const isSubmitPending = ref(false)

  Object.keys(fields).forEach((field) => {
    watch(
      () => fields[field]?.value,
      () =>
        Object.keys(errors).forEach((path) => {
          if (path === field || path.startsWith(field + '.'))
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete errors[path]
        }),
    )
  })

  async function submit() {
    if (options?.beforeSubmit) await options.beforeSubmit(fields)

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    Object.keys(errors).forEach((key) => delete errors[key])

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
      if (options?.onError) await options.onError(error)

      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          errors[issue.path.join('.')] = issue.message
        })
      } else if (error instanceof FetchError && error.data.data?.issues) {
        ;(error.data.data.issues as ErrorIssue[]).forEach((issue) => {
          errors[issue.field]! = issue.message
        })
      } else {
        errors.general = 'An unexpected error occurred. Please try again later.'
      }
    } finally {
      isSubmitPending.value = false
    }
  }

  return {
    fields,
    errors,
    isSubmitPending,
    submit,
  }
}
