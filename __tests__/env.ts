import {config, SharedIniFileCredentials, DynamoDB} from 'aws-sdk'
import {S3} from 'aws-sdk'

const region = 'ap-northeast-2'
const credentials = new SharedIniFileCredentials({profile: 'yiguana'})
config.credentials = credentials

export const ddbClient = new DynamoDB.DocumentClient({region})
export const tableName = 'test-yiguana'
export const s3Client = new S3({region})
export const bucketName = 'test-yiguana'

