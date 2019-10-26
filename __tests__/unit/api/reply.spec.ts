import {EPriority} from '../../../src/entity/enum'
import {createApi} from '../../../src/api'
import {Post} from '../../../src/entity/post'
import {Comment} from '../../../src/entity/comment'
import {bucketName, ddbClient, s3Client, tableName} from '../../env'

describe('unit', () => {
  describe('api', () => {
    describe('reply', () => {

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
        commentId = comment.hk
      })

      const api = createApi({ddbClient, s3Client, tableName, bucketName})
      const member = {
        userId: 'member',
        ip: '0.0.0.0',
      }

      let post: Post
      let comment: Comment
      let commentId: string

      it('create reply', async() => {
        const reply = await api.reply.create({
          data: {
            commentId,
            content: 'reply content',
            createdAt: new Date().toISOString(),
          },
          user: {
            name: 'not member',
            pw: 'password',
            ip: '0.0.0.1'
          }
        })
        const {items} = await api.reply.list({commentId})
        expect(items.length).toEqual(1)
        console.table(items)
      })

      it('update reply', async() => {
        const {items: replyItems} = await api.reply.list({commentId})
        const targetReply = replyItems[0]
        expect(targetReply).not.toEqual(undefined)

        const content = 'updated reply content'
        const isUpdated = await api.reply.update({
          data: {
            hk: targetReply.hk,
            commentId,
            content
          }
        })
        const {items: after} = await api.reply.list({commentId})
        console.table(after)
      })
      it.todo('like reply')
      it.todo('cancel like reply')

      it('remove reply', async() => {
        const {items: replyItems} = await api.reply.list({commentId})
        const targetReply = replyItems[0]
        expect(targetReply).not.toEqual(undefined)

        const isRemoved = await api.reply.del({
          hk: targetReply.hk
        })
        const {items: after} = await api.reply.list({commentId})
        console.table(after)
      })

      it.todo('request to block reply')

    })
  })
})