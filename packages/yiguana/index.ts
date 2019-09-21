import {createApi} from './api/dynamodb/dynamodb'
import {YiguanaApi} from './api'
import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {S3} from 'aws-sdk'

export function createYiguana(params: CreateInput) {
  const {ddbClient, s3Client, bucketName, tableName} = params
  const dynamodb = createDynamoDB(ddbClient)
  const s3 = createS3(s3Client)

  return createApi({
    dynamodb,
    tableName,
    s3,
    bucketName,
  })
}

export class Yiguana extends YiguanaApi {
}

type CreateInput = {
  ddbClient: DocumentClient
  s3Client: S3
  tableName: string
  bucketName: string
}
