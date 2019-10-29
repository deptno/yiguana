import {EPriority} from '../../../src/entity/enum'
import {createApi} from '../../../src/api'
import {Post} from '../../../src/entity/post'
import {Comment} from '../../../src/entity/comment'
import {bucketName, ddbClient, s3Client, tableName} from '../../env'
import {member_f, non_member_a} from '../../__data__/user'

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
            priority: EPriority.Normal,
          },
          user: member_f,
        })
        commentId = comment.hk
      })

      it('create reply', async() => {
        const reply = await api.reply.create({
          data: {
            commentId,
            content: 'reply content',
            createdAt: new Date().toISOString(),
          },
          user: non_member_a
        })
        const {items} = await api.reply.list({commentId})
        expect(items.length).toEqual(1)
        expect(items[0]).toEqual(reply)
        console.table(items)
      })

      it('update reply', async() => {
        const {items: replyItems} = await api.reply.list({commentId})
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
        const {items: after} = await api.reply.list({commentId})
        console.table(after)
        const found = after.find(r => r.hk === targetReply.hk)!
        expect(found).toBeDefined()
        expect(found.content).toEqual(content)
        expect(found).toEqual(updatedReply)
      })
      it.todo('like reply')
      it.todo('cancel like reply')

      it('remove reply', async() => {
        const {items: replyItems} = await api.reply.list({commentId})
        const [targetReply] = replyItems
        expect(targetReply).not.toEqual(undefined)

        expect(targetReply.deleted).toBeUndefined()
        const isRemoved = await api.reply.del({
          hk: targetReply.hk
        })
        expect(isRemoved).toEqual(true)
        const {items: after} = await api.reply.list({commentId})
        console.table(after)
        const found = after.find(r => r.hk === targetReply.hk)!
        expect(found).toBeDefined()
        expect(found.deleted).toEqual(true)
      })

      it.todo('request to block reply')

    })
  })
})