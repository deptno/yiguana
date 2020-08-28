import {createApi} from './api'
import {S3} from 'aws-sdk'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {configure} from './configure'

export const createYiguana = (input: Input) => {
  return createApi(configure(input))
}

type Input = {
  s3BucketName: string
  s3Client: S3
  s3MinContentLength: number
  s3MaxContentLength: number
  ddbClient: DocumentClient
  ddbTableName: string
}


