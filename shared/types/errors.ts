export type ErrorIssue = {
  field: string
  message: string
  rule?: string
}

export type ApiErrorData = {
  code: string
  issues: ErrorIssue[] | null
  meta?: Record<string, unknown>
}

export type ApiError = {
  statusCode: number
  statusMessage: string
  data: ApiErrorData | null
}
