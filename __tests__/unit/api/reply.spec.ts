import {Post} from '../../../src/entity/post'
import {Comment} from '../../../src/entity/comment'
import {yiguana} from '../../env'
import {member_f, non_member_a} from '../../__data__/user'
import * as R from 'ramda'

describe('unit', () => {
  describe('api', () => {
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
          user: non_member_a
        })
        const {items} = await yiguana.comment.list({
          data: {
            postId: comment.postId
          }
        })
        expect(items.length).toEqual(before.length + 1)
        expect(R.last(items)).toEqual(reply)
        console.table(items)
      })

      it.todo('request to block reply')

    })
  })
})