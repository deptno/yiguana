import {createApi} from '../../../src/api'
import {Post} from '../../../src/entity/post'
import {Comment} from '../../../src/entity/comment'
import {bucketName, ddbClient, s3Client, tableName} from '../../env'
import {EPriority} from '../../../src/entity/enum'
import {EValidationErrorMessage} from '../../../src/entity/error'
import {member_a, member_b, member_f} from '../../__data__/user'

describe('unit', () => {
  describe('api', () => {
    describe('comment', () => {
      const api = createApi({ddbClient, s3Client, tableName, bucketName})
      let post: Post
      let comment: Comment

      beforeAll(async () => {
        post = await api.post.create({
          data: {
            content: 'content',
            title: 'title',
            category: 'news',
          },
          user: member_f,
        })
        comment = await api.comment.create({
          data: {
            postId: post.hk,
            content: 'init data',
            priority: EPriority.Normal,
          },
          user: member_f,
        })
      })

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
              user: member_a,
            })
          } catch (e) {
            expect(e.message).toEqual(EValidationErrorMessage.InvalidInput)
          }
          const {items} = await api.comment.list({
            postId: post.hk,
          })
          expect(items.length).toEqual(2)
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
          const {items: before} = await api.comment.list({
            postId: post.hk,
          })
          await api.comment.like({
            data: before[0],
            user: member_f,
          })
          const {items: after} = await api.comment.list({
            postId: post.hk,
          })
          expect(after[0].likes).toEqual(before[0].likes + 1)
        })
        it('like comment -> like comment', async() => {
          const {items: first} = await api.comment.list({
            postId: post.hk,
          })
          await api.comment.like({
            data: first[0],
            user: member_b,
          })
          const {items: second} = await api.comment.list({
            postId: post.hk,
          })
          expect(second[0].likes).toEqual(first[0].likes + 1)

          console.debug('like post 1회 수행하여 like가 이미 존재할 시 unlike 동작')
          await api.comment.like({
            data: second[0],
            user: member_b,
          })
          const {items: third} = await api.comment.list({
            postId: post.hk,
          })
          expect(third[0].likes).toEqual(second[0].likes - 1)
        })
        it('unlike comment', async() => {
          const {items: before} = await api.comment.list({
            postId: post.hk,
          })
          await api.comment.unlike({
            data: before[0],
          })
          const {items: after} = await api.comment.list({
            postId: post.hk,
          })
          expect(after[0].likes).toEqual(before[0].likes - 1)
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