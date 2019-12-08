import {DynamoDB, S3} from 'aws-sdk'
import {createYiguana} from '../../../../../../../lib'

const region = 'ap-northeast-2'

export const yiguana = createYiguana({
  s3BucketName: 'test-yiguana',
  ddbTableName: 'test-yiguana',
  ddbClient: new DynamoDB.DocumentClient({region}),
  s3Client: new S3({region}),
  s3MinContentLength: 128,
  s3MaxContentLength: 1048579
})


