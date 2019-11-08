import {createApi} from '../../../src/api'
import {Post} from '../../../src/entity/post'
import {Comment} from '../../../src/entity/comment'
import {bucketName, ddbClient, s3Client, tableName} from '../../env'
import {member_a, member_b, member_f, non_member_a} from '../../__data__/user'

describe('unit', () => {
  describe('api', () => {
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
          user: non_member_a
        })
        const {items} = await api.comment.list({postId: comment.postId})
        expect(items.length).toEqual(before.length + 1)
        expect(items[0]).toEqual(reply)
        console.table(items)
      })

      it('update reply', async() => {
        const {items: replyItems} = await api.reply.list({comment})
        const targetReply = replyItems[0]
        expect(targetReply).not.toEqual(undefined)

        const content = 'updated reply content'
        expect(targetReply).not.toEqual(content)
        const updatedReply = await api.reply.update({
          data: {
            hk: targetReply.hk,
            commentId,
            content
          },
          user: member_f
        })
        expect(updatedReply).not.toEqual(targetReply)
        const {items: after} = await api.reply.list({comment})
        console.table(after)
        const found = after.find(r => r.hk === targetReply.hk)!
        expect(found).toBeDefined()
        expect(found.content).toEqual(content)
        expect(found).toEqual(updatedReply)
      })
      it('like reply', async() => {
        const {items: before} = await api.reply.list({comment})
        expect(before[0]).not.toEqual(undefined)

        await api.reply.like({
          data: before[0],
          user: member_a,
        })
        const {items: after} = await api.reply.list({comment})
        expect(after[0].likes).toEqual(before[0].likes + 1)
      })
      it('like comment + like comment => cancel like reply', async () => {
        const {items: first} = await api.reply.list({comment})
        await api.reply.like({
          data: first[0],
          user: member_b,
        })
        const {items: second} = await api.reply.list({comment})
        expect(second[0].likes).toEqual(first[0].likes + 1)

        console.debug('like post 1회 수행하여 like가 이미 존재할 시 unlike 동작')
        await api.reply.like({
          data: second[0],
          user: member_b,
        })
        const {items: third} = await api.reply.list({comment})
        expect(third[0].likes).toEqual(second[0].likes - 1)
      })

      it('remove reply', async() => {
        const {items: replyItems} = await api.reply.list({comment})
        const [targetReply] = replyItems
        expect(targetReply).not.toEqual(undefined)

        expect(targetReply.deleted).toBeUndefined()
        const isRemoved = await api.reply.del({
          hk: targetReply.hk
        })
        expect(isRemoved).toEqual(true)
        const {items: after} = await api.reply.list({comment})
        console.table(after)
        const found = after.find(r => r.hk === targetReply.hk)!
        expect(found).toBeDefined()
        expect(found.deleted).toEqual(true)
      })

      it.todo('request to block reply')

    })
  })
})