import {createApi} from '../../../src/api'
import {DynamoDB, S3} from 'aws-sdk'
import {EValidationErrorMessage} from '../../../src/entity/error'
import {Post} from '../../../src/entity/post'

describe('api', () => {
  describe('comment', () => {
    const api = createApi({
      ddbClient: new DynamoDB.DocumentClient({region: 'ap-northeast-2'}),
      s3Client: new S3({region: 'ap-northeast-2'}),
      tableName: 'yiguana',
      bucketName: 'yiguana',
    })
    let post: Post

    beforeAll(async () => {
      post = await api.post.create({
        data: {
          content: 'content',
          title: 'title',
          category: 'news',
          userName: 'name',
          userPw: 'pw',
        },
      })
    })

    it('list(0)', async () => {
      const {items} = await api.comment.list({
        postId: post.hk
      })
      expect(items.length).toEqual(0)
    })

    describe('comment', () => {
      it('create comment', async () => {
      })
      it('update comment', async () => {
      })
      it('like comment', async () => {
      })
      it('unlike comment', async () => {
      })
      it('view comment', async () => {
      })
      it('remove comment', async () => {
      })
      it('request to block comment', async () => {
      })
    })
  })
})