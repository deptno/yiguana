import {DynamoDB, S3} from 'aws-sdk'
import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {createApi} from '../src/api'

export const ddbClient = new DynamoDB.DocumentClient()
export const tableName = 'test-yiguana'
export const s3Client = new S3()
export const bucketName = 'test-yiguana'

const dynamodb = createDynamoDB(ddbClient)
const s3 = createS3(s3Client)

export const opDdb = {dynamodb, tableName}
export const opS3 = {s3, bucketName}
export const yiguana = createApi({
  s3BucketName: 'test-yiguana',
  ddbTableName: 'test-yiguana',
  ddbClient: new DynamoDB.DocumentClient({region: 'ap-northeast-2'}),
  s3Client: new S3({region: 'ap-northeast-2'}),
  s3MinContentLength: 128,
  s3MaxContentLength: 1048579,
})

