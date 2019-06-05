import {config, SharedIniFileCredentials} from 'aws-sdk'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'

const region = 'ap-northeast-2'
const credentials = new SharedIniFileCredentials({profile: 'googit'})
config.credentials = credentials

export const ddbClient = new DocumentClient({region})
export const tableName = 'dev-yiguana'

