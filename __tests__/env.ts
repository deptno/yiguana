import {config, SharedIniFileCredentials, DynamoDB} from 'aws-sdk'

const region = 'ap-northeast-2'
const credentials = new SharedIniFileCredentials({profile: 'yiguana'})
config.credentials = credentials

export const ddbClient = new DynamoDB.DocumentClient({region})
export const tableName = 'test-yiguana'

