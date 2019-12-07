import {createApi} from '../../../src/api'
import {Post} from '../../../src/entity/post'
import {Comment} from '../../../src/entity/comment'
import {bucketName, ddbClient, s3Client, tableName} from '../../env'
import {EValidationErrorMessage} from '../../../src/entity/error'
import {admin, member_a, member_f} from '../../__data__/user'

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
          },
          user: member_f,
        })
      })

      it('list(0)', async () => {
        const {items} = await api.comment.list({
          data: {
            postId: post.hk,
          }
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
              },
              user: member_a,
            })
          } catch (e) {
            expect(e.message).toEqual(EValidationErrorMessage.InvalidInput)
          }
          const {items} = await api.comment.list({
            data: {
              postId: post.hk,
            }
          })
          expect(items.length).toEqual(2)
        })
        it('update comment', async () => {
          const {items: before} = await api.comment.list({
            data: {
              postId: post.hk,
            }
          })
          console.table(before)

          const targetComment = await api.comment.update({
            data: {
              hk: comment.hk,
              postId: post.hk,
              content: 'updated content',
              updatedAt: new Date().toISOString(),
            },
            user: admin as any,
          })
          console.table(targetComment)

          const {items: after} = await api.comment.list({
            data: {
              postId: post.hk,
            }
          })
          console.table(after)

          const [beforeItem] = before.filter(i => i.hk === comment.hk)
          const [afterItem] = after.filter(i => i.hk === comment.hk)
          expect(afterItem.content).not.toEqual(beforeItem.content)
        })
        it('delete comment', async() => {
          const {items: before} = await api.comment.list({
            data: {
              postId: post.hk,
            }
          })
          console.table(before)

          const targetComment = await api.comment.del({
            user: admin as any,
            data: comment,
          })
          console.table(targetComment)

          const {items: after} = await api.comment.list({
            data: {
              postId: post.hk,
            }
          })
          console.table(after)
        })
      })
    })
  })
})