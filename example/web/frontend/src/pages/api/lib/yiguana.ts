import {DynamoDB, S3} from 'aws-sdk'
import {createApi} from '../../../../../../../lib'

const region = 'ap-northeast-2'

export const yiguana = createApi({
  bucketName: 'test-yiguana',
  tableName: 'test-yiguana',
  ddbClient: new DynamoDB.DocumentClient({region}),
  s3Client: new S3({region})
})

