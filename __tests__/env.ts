import {DynamoDB, S3} from 'aws-sdk'

export const ddbClient = new DynamoDB.DocumentClient()
export const tableName = 'test-yiguana-table'
export const s3Client = new S3()
export const bucketName = 'test-yiguana-bucket'

