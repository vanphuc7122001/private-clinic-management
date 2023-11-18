type ErrorType = Record<string, string>

export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrorType
  constructor({
    message = 'Validation Error',
    status = 422,
    errors
  }: {
    message?: string
    status?: number
    errors: ErrorType
  }) {
    super({ message, status })
    this.errors = errors
  }
}
