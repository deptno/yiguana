import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {S3} from 'aws-sdk'

export function configure(params: Input) {
  const {ddbClient, s3Client} = params

  return {
    s3: createS3(s3Client),
    dynamodb: createDynamoDB(ddbClient),
  }
}

type Input = {
  s3Client: S3
  ddbClient: DocumentClient
}
