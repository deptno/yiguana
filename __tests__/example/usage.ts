import {createApi} from '../../src/api'
import {DynamoDB, S3} from 'aws-sdk'

const region = 'ap-northeast-2'

const api = createApi({
  ddbClient: new DynamoDB.DocumentClient({region}),
  s3Client: new S3({region}),
  tableName: 'yiguana',
  bucketName: 'yiguana',
})
