import {createApi} from '../../../src/api'
import {Post} from '../../../src/entity/post'
import {bucketName, ddbClient, s3Client, tableName} from '../../env'

describe('unit', () => {
  describe('api', () => {
    describe('comment', () => {

      beforeAll(async () => {
        post = await api.post.create({
          data: {
            content: 'content',
            title: 'title',
            category: 'news',
            userName: 'name',
            userPw: 'pw',
          },
          user: member
        })
      })

      const api = createApi({ddbClient, s3Client, tableName, bucketName})
      const member = {
        userId: 'member',
        ip: '0.0.0.0'
      }

      let post: Post

      it('list(0)', async () => {
        const {items} = await api.comment.list({
          postId: post.hk,
        })
        expect(items.length).toEqual(0)
      })

      describe('comment', () => {
        it.todo('create comment')
        it.todo('update comment')
        it.todo('like comment')
        it.todo('unlike comment')
        it.todo('view comment')
        it.todo('remove comment')
        it.todo('request to block comment')
      })

    })
  })
})