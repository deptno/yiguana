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
              category: 'news',
              title: 'title',
              content: 'content',
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

        it('comment list, user comment list === 1', async () => {
          const {items: commentList} = await api.comment.list({
            data: {
              postId: post.hk,
            }
          })
          expect(commentList.length).toEqual(1)
          const {items: userCommentList} = await api.user.comment.list({
            data: {},
            user: member_f,
          })
          expect(userCommentList.length).toEqual(1)
        })
        it('like comment, member f', async () => {
          const {items: before} = await api.comment.list({
            data: {
              postId: post.hk,
            }
          })
          await api.user.comment.like({
            data: {
              data: before[0],
              createdAt: new Date().toISOString()
            },
            user: member_f,
          })
          const {items: after} = await api.comment.list({
            data: {
              postId: post.hk,
            }
          })
          expect(after[0].likes).toEqual(before[0].likes + 1)
        })
        it('like comment -> like comment, member_b', async () => {
          const {items: before} = await api.comment.list({
            data: {
              postId: post.hk,
            }
          })
          const [targetComment] = before
          await api.user.comment.like({
            data: {
              data: targetComment,
              createdAt: new Date().toISOString()
            },
            user: member_b,
          })
          const first = await api.comment.read({
            data: {
              hk: comment.hk,
            }
          })
          expect(first.likes).toEqual(targetComment.likes + 1)

          console.debug('like comment 1회 수행하여 like가 이미 존재할 시 unlike 동작')
          await api.user.comment.like({
            data: {
              data: targetComment,
              createdAt: new Date().toISOString()
            },
            user: member_b,
          })
          const second = await api.comment.read({
            data: {
              hk: comment.hk,
            }
          })
          console.debug('member_b의 좋아요는 취소가 되고 member_f가 좋아요 했던 것만 남아서 1이 기대값')
          expect(second.likes).toEqual(1)

          const {items: after} = await api.comment.list({
            data: {
              postId: post.hk,
            }
          })
          expect(after[0].likes).toEqual(1)
          expect(after.length).toEqual(before.length)
        })
      })
    })
  })
})