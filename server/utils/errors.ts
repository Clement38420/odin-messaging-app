import { H3Error } from 'h3'
import { DrizzleQueryError } from 'drizzle-orm'

type dbErrorInfos = {
  statusCode: number
  statusMessage: string
  field?: string
  fieldMessage?: string
}

const dbErrorMap: Record<string, dbErrorInfos> = {
  '23505': {
    statusCode: 400,
    statusMessage: 'Some infos must be unique',
    fieldMessage: 'Already exists',
  },
}

export function errorHandler(error: unknown) {
  if (error instanceof H3Error) throw error
  if (error instanceof DrizzleQueryError) dbErrorHandler(error)
  throw createError({
    statusCode: 500,
    statusMessage: 'Internal server error',
    data: {
      errors: [
        {
          field: 'general',
          message: 'An unexpected error occurred. Please try again later.',
        },
      ],
      detail: error,
    },
  })
}

export function dbErrorHandler(error: DrizzleQueryError) {
  if (error.cause?.code && error.cause?.constraint) {
    const errorInfos = dbErrorMap[error.cause!.code]
    const field = error.cause!.constraint.split('_')[1]

    throw createError({
      statusCode: errorInfos.statusCode,
      statusMessage: errorInfos.statusMessage,
      data: {
        errors: [
          {
            field: field ?? 'general',
            message: errorInfos.fieldMessage,
          },
        ],
        detail: error,
      },
    })
  }
}
