export class S3Error extends Error {
  constructor(message: ES3ErrorMessage) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, S3Error)
    }
  }
}

export enum ES3ErrorMessage {
  FailToPut = 'Fail to put',
  FailToGet = 'Fail to get'
}

