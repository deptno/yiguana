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
          const {items: before} = await api.comment.list({
            data: {
              postId: comment.postId
            }
          })
          expect(before.length).toEqual(1)
          const reply = await api.reply.create({
            data: {
              comment,
              content: 'reply content',
              createdAt: new Date().toISOString(),
            },
            user: member_a
          })
          const {items: after} = await api.comment.list({
            data: {
              postId: comment.postId
            }
          })
          expect(after.length).toEqual(before.length + 1)
          expect(R.last(after)).toEqual(reply)
          console.table(after)

          const {items} = await api.user.reply.list({
            user: member_a,
            data: {}
          })
          expect(items.length).toEqual(1)
          console.table(after)
        })
      })
    })
  })
})