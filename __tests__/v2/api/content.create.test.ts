import {createYiguana} from '../../../src'
import {DynamoDB, S3} from 'aws-sdk'
import {Post} from '../../../src/model'

describe('v2', function () {
  let yiguana: ReturnType<typeof createYiguana>
  beforeEach(() => {
    yiguana = createYiguana({
      ddbClient: new DynamoDB.DocumentClient({region: 'localhost'}),
      ddbTableName: 'local-test',
      s3Client: new S3({region: 'localhost'}),
      s3BucketName: 'local-bucket',
      s3MinContentLength: 2 ** 8, // 128B
      s3MaxContentLength: 2 ** 22, // 4MB
    })
  })

  describe('authorize', () => {
    test.todo('admin')
    test.todo('member')
    test.todo('notMember')
  })
  describe('api', () => {
    test('content.create', () => {
      return yiguana.content.create({
        bucketName: 's3-bucket',
        content: 'this is content',
      }).then(response => expect(response.Key).toBeDefined())
    })
    test('post.create', () => {
      return yiguana.post.create({
        user: {
          id: 'userId'
        },
        data: {
          title: 'title',
          cover: 'https://',
          id: 'userId',
          category: 'news',
          contentUrl: 's3://',
        }
      }).then(response => expect(response instanceof Post).toBeTruthy())
    })
  })
})