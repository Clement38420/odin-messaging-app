import { H3Error } from 'h3'

export abstract class DomainError extends H3Error {
  protected constructor(
    message: string,
    code: string,
    statusCode: number = 422,
    statusMessage: string = 'Unprocessable Entity',
    issues: ErrorIssue[] = [],
    meta?: Record<string, unknown>,
  ) {
    super(message)
    this.statusCode = statusCode
    this.statusMessage = statusMessage
    this.data = {
      code,
      issues,
      meta,
    } as ApiErrorData
  }
}

export class InputValidationError extends DomainError {
  constructor(issues: ErrorIssue[]) {
    super(
      'Validation Failed',
      'VALIDATION_ERROR',
      422,
      'Unprocessable Entity',
      issues,
    )
  }
}

type ConflictOptions = {
  code?: 'UNIQUE_VIOLATION' | 'STATE_CONFLICT' | 'VERSION_CONFLICT'
  field?: string
  meta?: Record<string, unknown>
}

export class ResourceConflictError extends DomainError {
  constructor(message: string, options: ConflictOptions = {}) {
    const { code = 'UNIQUE_VIOLATION', field, meta } = options

    super(
      'Resource Conflict',
      code,
      409,
      'Resource Conflict',
      [
        {
          field: field || 'general',
          message,
          rule: code.toLowerCase(),
        },
      ],
      meta,
    )
  }
}

export class BusinessError extends DomainError {
  constructor(code: string, message: string) {
    super(message, code, 422, 'Unprocessable Entity', [])
  }
}
