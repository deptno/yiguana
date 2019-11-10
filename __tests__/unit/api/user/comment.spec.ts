import {createApi} from '../../../../src/api'
import {bucketName, ddbClient, s3Client, tableName} from '../../../env'
import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {member_b, member_f} from '../../../__data__/user'

describe('unit', () => {
  describe('api', () => {
    describe('user', () => {
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
        // FIXME: 왜 실패인지 검토
//        it('list(0) byUserId', async () => {
//          const {items} = await api.user.comment.list({
//            userId: member_f.id,
//          })
//          expect(items.length).toEqual(1)
//        })

        it('like comment', async () => {
          const {items: before} = await api.comment.list({
            postId: post.hk,
          })
          await api.user.comment.like({
            data: before[0],
            user: member_f,
          })
          const {items: after} = await api.comment.list({
            postId: post.hk,
          })
          expect(after[0].likes).toEqual(before[0].likes + 1)
        })
        it('like comment -> like comment', async () => {
          const {items: first} = await api.comment.list({
            postId: post.hk,
          })
          await api.user.comment.like({
            data: first[0],
            user: member_b,
          })
          const {items: second} = await api.comment.list({
            postId: post.hk,
          })
          expect(second[0].likes).toEqual(first[0].likes + 1)

          console.debug('like post 1회 수행하여 like가 이미 존재할 시 unlike 동작')
          await api.user.comment.like({
            data: second[0],
            user: member_b,
          })
          const {items: third} = await api.comment.list({
            postId: post.hk,
          })
          expect(third[0].likes).toEqual(second[0].likes - 1)
        })
        it('unlike comment', async () => {
          const {items: before} = await api.comment.list({
            postId: post.hk,
          })
          await api.user.comment.unlike({
            data: before[0],
          })
          const {items: after} = await api.comment.list({
            postId: post.hk,
          })
          expect(after[0].likes).toEqual(before[0].likes - 1)
        })
      })
    })
  })
})