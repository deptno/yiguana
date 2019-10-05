import {DynamoDB, S3} from 'aws-sdk'
import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'

export const ddbClient = new DynamoDB.DocumentClient()
export const tableName = 'test-yiguana-table'
export const s3Client = new S3()
export const bucketName = 'test-yiguana-bucket'

const dynamodb = createDynamoDB(ddbClient)
const s3 = createS3(s3Client)

export const opDdb = {dynamodb, tableName: 'yiguana'}
export const opS3 = {s3, bucket: 'bucket'}
