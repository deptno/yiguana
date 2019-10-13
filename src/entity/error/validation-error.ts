export class ValidationError extends Error {
  constructor(message: EValidationErrorMessage) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

export enum EValidationErrorMessage {
  InvalidInput = 'Invalid input'
}

