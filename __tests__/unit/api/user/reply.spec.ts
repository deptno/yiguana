import {createApi} from '../../../../src/api'
import {bucketName, ddbClient, s3Client, tableName} from '../../../env'
import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {member_a, member_b, member_f} from '../../../__data__/user'
import * as R from 'ramda'

describe('unit', () => {
  describe('api', () => {
    describe('user', () => {
      describe('reply', () => {
        const api = createApi({ddbClient, s3Client, tableName, bucketName})
        let post: Post
        let comment: Comment
        let commentId: string

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
          commentId = comment.hk
        })

        it('create reply', async() => {
          const {items: before} = await api.comment.list({postId: comment.postId})
          expect(before.length).toEqual(1)
          const reply = await api.reply.create({
            data: {
              comment,
              content: 'reply content',
              createdAt: new Date().toISOString(),
            },
            user: member_a
          })
          const {items: after} = await api.comment.list({postId: comment.postId})
          expect(after.length).toEqual(before.length + 1)
          expect(R.last(after)).toEqual(reply)
          console.table(after)

          const {items} = await api.user.reply.list({
            userId: member_a.id,
          })
          expect(items.length).toEqual(1)
          console.table(after)
        })

        it('like reply', async() => {
          const {items: before} = await api.reply.list({comment})
          expect(before[0]).not.toEqual(undefined)

          await api.user.reply.like({
            data: before[0],
            user: member_a,
          })
          const {items: after} = await api.reply.list({comment})
          expect(after[0].likes).toEqual(before[0].likes + 1)
        })
        it('like comment + like comment => cancel like reply', async () => {
          const {items: first} = await api.reply.list({comment})
          await api.user.reply.like({
            data: first[0],
            user: member_b,
          })
          const {items: second} = await api.reply.list({comment})
          expect(second[0].likes).toEqual(first[0].likes + 1)

          console.debug('like post 1회 수행하여 like가 이미 존재할 시 unlike 동작')
          await api.user.reply.like({
            data: second[0],
            user: member_b,
          })
          const {items: third} = await api.reply.list({comment})
          expect(third[0].likes).toEqual(second[0].likes - 1)
        })
      })
    })
  })
})