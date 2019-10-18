import {DynamoDB, S3} from 'aws-sdk'
import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'

export const ddbClient = new DynamoDB.DocumentClient()
export const tableName = 'yiguana'
export const s3Client = new S3()
export const bucketName = 'yiguana-bucket'

const dynamodb = createDynamoDB(ddbClient)
const s3 = createS3(s3Client)

export const opDdb = {dynamodb, tableName}
export const opS3 = {s3, bucketName}
