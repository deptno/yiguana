import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {S3} from 'aws-sdk'
import {createStore} from './dynamodb/dynamodb'

export function createYiguana(params: CreateInput) {
  const {ddbClient, s3Client, bucketName, tableName} = params
  const dynamodb = createDynamoDB(ddbClient)
  const s3 = createS3(s3Client)

  return createStore({
    dynamodb,
    tableName,
    s3,
    bucketName,
  })
}

type CreateInput = {
  ddbClient: DocumentClient
  s3Client: S3
  tableName: string
  bucketName: string
}
