import type { $ZodIssue } from 'zod/v4/core'
import type { z } from 'zod'

function getRuleFromIssue(issue: $ZodIssue): string {
  if (issue.code === 'invalid_type' && issue.input === undefined) {
    return 'required'
  }

  if (issue.code === 'too_small') return 'min'
  if (issue.code === 'too_big') return 'max'

  return issue.code
}

export function validateSchema<T extends z.ZodObject>(
  schema: T,
  values: Record<string, unknown>,
) {
  const zodResult = schema.safeParse(values, { reportInput: true })
  if (!zodResult.success) {
    throw new InputValidationError(
      zodResult.error.issues.map((issue: $ZodIssue) => {
        return {
          field: issue.path.join('.'),
          message: issue.message,
          rule: getRuleFromIssue(issue),
        }
      }),
    )
  }

  return zodResult.data
}
