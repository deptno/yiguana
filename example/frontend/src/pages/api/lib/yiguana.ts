import {DynamoDB, S3} from 'aws-sdk'
import {createYiguana} from '../../../../../../lib'

export const yiguana = createYiguana({
  s3BucketName: 'test-yiguana',
  ddbTableName: 'test-yiguana',
  ddbClient: new DynamoDB.DocumentClient({region: 'ap-northeast-2'}),
  s3Client: new S3({region: 'ap-northeast-2'}),
  s3MinContentLength: 128,
  s3MaxContentLength: 1048579
})


