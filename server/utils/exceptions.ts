import { H3Error } from 'h3'

export abstract class DomainError extends H3Error {
  protected constructor(
    message: string,
    code: string,
    statusCode: number = 422,
    issues: ErrorIssue[] = [],
    meta?: Record<string, unknown>,
  ) {
    super(message)
    this.statusCode = statusCode
    this.statusMessage = 'Unprocessable Entity'
    this.data = {
      code,
      issues,
      meta,
    } as ApiErrorData
  }
}

export class InputValidationError extends DomainError {
  constructor(issues: ErrorIssue[]) {
    super('Validation Failed', 'VALIDATION_ERROR', 422, issues)
  }
}

export class ResourceConflictError extends DomainError {
  constructor(
    field: string,
    message: string = 'Already exists',
    meta?: Record<string, unknown>,
  ) {
    super(
      'Resource Conflict',
      'RESOURCE_CONFLICT',
      409,
      [{ field, message, rule: 'unique' }],
      meta,
    )
  }
}

export class BusinessError extends DomainError {
  constructor(code: string, message: string) {
    super(message, code, 422, [])
  }
}
