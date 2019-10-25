import {createApi} from '../../../src/api'
import {Post} from '../../../src/entity/post'
import {Comment} from '../../../src/entity/comment'
import {bucketName, ddbClient, s3Client, tableName} from '../../env'
import {EPriority} from '../../../src/entity/enum'
import {EValidationErrorMessage} from '../../../src/entity/error'

describe('unit', () => {
  describe('api', () => {
    describe('comment', () => {

      beforeAll(async () => {
        post = await api.post.create({
          data: {
            content: 'content',
            title: 'title',
            category: 'news',
          },
          user: member,
        })
        comment = await api.comment.create({
          data: {
            postId: post.hk,
            content: 'init data',
            priority: EPriority.Normal,
          },
          user: member,
        })
      })

      const api = createApi({ddbClient, s3Client, tableName, bucketName})
      const member = {
        userId: 'member',
        ip: '0.0.0.0',
      }

      let post: Post
      let comment: Comment

      it('list(0)', async () => {
        const {items} = await api.comment.list({
          postId: post.hk,
        })
        expect(items.length).toEqual(1)
      })

      describe('comment', () => {
        it('create comment', async () => {
          try {
            await api.comment.create({
              data: {
                postId: post.hk,
                content: 'test data',
                priority: EPriority.Normal,
              },
              user: {
                userId: 'userId',
                ip: '0.0.0.0',
              },
            })
          } catch (e) {
            expect(e.message).toEqual(EValidationErrorMessage.InvalidInput)
          }
        })
        it('update comment', async () => {
          const {items: before} = await api.comment.list({
            postId: post.hk,
          })
          console.table(before)

          const targetComment = await api.comment.update({
            data: {
              hk: comment.hk,
              postId: post.hk,
              content: 'updated content',
              updatedAt: new Date().toISOString(),
            },
          })
          console.table(targetComment)

          const {items: after} = await api.comment.list({
            postId: post.hk,
          })
          console.table(after)

          // TODO: before/after 객체가 Reply 타입을 갖도록 해야 expect 비교가 가능한데
        })
        it('like comment', async() => {
          const isLiked = await api.comment.like({
            hk: comment.hk,
          })
          expect(isLiked).toEqual(true)
          const {items} = await api.comment.list({
            postId: post.hk,
          })
          console.table(items)
        })
        it('unlike comment', async() => {
          const isUnliked = await api.comment.unlike({
            hk: comment.hk,
          })
          expect(isUnliked).toEqual(true)
          const {items} = await api.comment.list({
            postId: post.hk,
          })
          console.table(items)
        })
        it.todo('view comment')
        it('remove comment', async() => {
          const {items: before} = await api.comment.list({
            postId: post.hk,
          })
          console.table(before)

          const targetComment = await api.comment.del({
            hk: comment.hk,
          })
          console.table(targetComment)

          const {items: after} = await api.comment.list({
            postId: post.hk,
          })
          console.table(after)
        })
        it.todo('request to block comment')
      })

    })
  })
})