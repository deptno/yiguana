import {createYiguana} from '../index'
import {DynamoDB, S3} from 'aws-sdk'
import {Post} from '../model'

describe('v2', function () {
  let yiguana: ReturnType<typeof createYiguana>
  beforeAll(() => {
    yiguana = createYiguana({
      ddbClient: new DynamoDB.DocumentClient(),
      ddbTableName: 'test-yiguana',
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
    test('{content, post}.create', async () => {
      const content = await yiguana.content.create({
        bucketName: 'test-yiguana',
        content: 'this is content',
      })
      console.log('content', content)
      expect(content.Key).toBeDefined()
      const post = await yiguana.post.create({
        user: {
          id: 'userId',
        } as Yiguana.Member,
        data: {
          title: 'title',
          cover: 'https://',
          id: content.Key,
          category: 'news',
          contentUrl: 's3://',
        },
      })
      console.log('post', post)
      expect(post instanceof Post).toBeTruthy()
    })
    test('post.list category: hello', async () => {
      const {items, firstResult, lastEvaluatedKey} = await yiguana.post.list({
        data: {
          category: 'hello',
        },
      })
      console.log(items, 'list: category: hello')
      expect(firstResult).toBe(true)
      expect(items.length).toBe(0)
      expect(lastEvaluatedKey).toBe(undefined)
    })
    test('post.list category: news', async () => {
      const {items, firstResult, lastEvaluatedKey} = await yiguana.post.list({
        data: {
          category: 'news',
        },
      })
      expect(firstResult).toBe(true)
      expect(items.length).toBe(1)
      expect(lastEvaluatedKey).toBe(undefined)
    })
    test('post.list all', async () => {
      const {items, firstResult, lastEvaluatedKey} = await yiguana.post.list({
        data: {},
      })
      console.log(items, 'list all')
      expect(firstResult).toBe(true)
      expect(items.length).toBe(1)
      expect(lastEvaluatedKey).toBe(undefined)
    })
    test('post.view', async () => {
      const {items, firstResult, lastEvaluatedKey} = await yiguana.post.list({
        data: {},
      })
      const [item] = items
      expect(item.views).toBe(0)
      console.log(item, 'view')
      const viewed = await yiguana.post.view({
        data: item._document
      })
      expect(viewed!.views).toBe(1)
      expect(item.hk! === viewed!.hk).toBe(true)
    })
    test('post.del', async () => {
      const {items, firstResult, lastEvaluatedKey} = await yiguana.post.list({
        data: {},
      })
      const [item] = items
      console.log(item, 'del')
      const deleted = await yiguana.post.del({
        user: {
          id: 'userId',
        },
        data: {
          hk: item.hk,
        }
      })
      console.log(deleted)
      expect(item.hk! === deleted!.hk).toBe(true)
    })
  })
})