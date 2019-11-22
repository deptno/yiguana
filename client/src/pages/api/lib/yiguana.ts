import {createApi} from '../../../../../lib'
import {DynamoDB, S3} from 'aws-sdk'

const region = 'ap-northeast-2'

export const yiguana = createApi({
  bucketName: 'test-yiguana',
  tableName: 'test-yiguana',
  ddbClient: new DynamoDB.DocumentClient({region}),
  s3Client: new S3({region})
})

