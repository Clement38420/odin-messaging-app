import type { z } from 'zod'

export function validateSchema<T extends z.ZodObject>(
  schema: T,
  values: Record<string, unknown>,
) {
  const zodResult = schema.safeParse(values, { reportInput: true })
  if (!zodResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
      data: {
        errors: zodResult.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          }
        }),
      },
    })
  }

  return zodResult.data
}
