import type { DatabaseError } from 'pg'
import { H3Error } from 'h3'

export function handleError(error: unknown) {
  if (error instanceof H3Error) {
    throw error
  }

  handleDrizzleError(error)

  throw createError({
    statusCode: 500,
    statusMessage: 'Internal Server Error',
  })
}

const CONSTRAINT_MAP: Record<string, string> = {
  users_email_unique: 'email',
  users_username_unique: 'username',
  general: 'general',
}

export function handleDrizzleError(error: unknown) {
  if (error instanceof DrizzleQueryError) {
    const cause = error.cause as DatabaseError
    switch (cause?.code) {
      case '23505': {
        const field = CONSTRAINT_MAP[cause?.constraint || 'general']
        throw new ResourceConflictError(
          'This value is already taken, try another one.',
          {
            field,
          },
        )
      }
      case '23503': {
        const field = CONSTRAINT_MAP[cause?.constraint || 'general']
        throw new InputValidationError([
          {
            field,
            message: 'Resource not found or invalid reference',
            rule: 'exists',
          },
        ])
      }
    }
  }
  throw error
}
