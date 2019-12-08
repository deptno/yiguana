import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {member_a, member_f} from '../../../__data__/user'
import * as R from 'ramda'
import {yiguana} from '../../../env'

describe('unit', () => {
  describe('api', () => {
    describe('user', () => {
      describe('reply', () => {
        let post: Post
        let comment: Comment
        let commentId: string

        beforeAll(async () => {
          post = await yiguana.post.create({
            data: {
              content: 'content',
              title: 'title',
              category: 'news',
            },
            user: member_f,
          })
          comment = await yiguana.comment.create({
            data: {
              postId: post.hk,
              content: 'init data',
              createdAt: new Date().toISOString()
            },
            user: member_f,
          })
          commentId = comment.hk
        })

        it('create reply', async() => {
          const {items: before} = await yiguana.comment.list({
            data: {
              postId: comment.postId
            }
          })
          expect(before.length).toEqual(1)
          const reply = await yiguana.reply.create({
            data: {
              comment,
              content: 'reply content',
              createdAt: new Date().toISOString(),
            },
            user: member_a
          })
          const {items: after} = await yiguana.comment.list({
            data: {
              postId: comment.postId
            }
          })
          expect(after.length).toEqual(before.length + 1)
          expect(R.last(after)).toEqual(reply)
          console.table(after)

          const {items} = await yiguana.user.comment.list({
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