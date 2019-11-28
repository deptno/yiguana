export class ValidationError extends Error {
  constructor(message: string = EValidationErrorMessage.InvalidInput) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

// TODO: use internal
export enum EValidationErrorMessage {
  InvalidInput = 'Invalid input'
}

