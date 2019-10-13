import {Post} from '../../../src/entity/post'
import {getInitialData} from '../../setup'
import {opDdb} from '../../env'
import {addComment} from '../../../src/api/dynamodb/add-comment'
import {createComment} from '../../../src/entity/comment'
import {comments} from '../../../src/api/dynamodb/comments'
import {EPriority} from '../../../src/entity/enum'
import {post} from '../../../src/api/dynamodb/post'
import {commentPost} from '../../../src/api/dynamodb/comment-post'

describe('api', function () {
  let postList: Post[]
  let commentedPost: Post

  describe('comments', () => {
    beforeAll(() => getInitialData().then(d => {
      postList = d
      commentedPost = postList[0]
    }))

    it('comments(1)', async function () {
      const {items} = await comments(opDdb, {postId: commentedPost.hk})
      console.debug('comments')
      console.table(items)

      expect(items.length).toEqual(1)
    })
    it('comments(1)', async function () {
      const {items} = await comments(opDdb, {postId: commentedPost.hk})
      const nextCommentedPost = await post(opDdb, {hk: commentedPost.hk})
      expect(nextCommentedPost.comments).toEqual(items.length)
    })
    it('addComment(회원)', async function () {
      console.debug('회원')
      const comment = createComment({
        data: {
          postId: commentedPost.hk,
          content: 'comment',
          priority: EPriority.Normal,
        },
        user: {
          userId: 'aSsi',
          ip: '0.0.0.0',
        },
      })
      const commented = await addComment(opDdb, {data: comment})
      console.table([comment, commented])
      expect(commented).toEqual(comment)
    })
    it('comments(2)', async function () {
      const {items} = await comments(opDdb, {
        postId: commentedPost.hk,
      })
      console.debug('comments')
      console.table(items)
      expect(items).toHaveLength(2)
    })
    it('commentPost(2), Post 의 comments 값도 증가', async function () {
      await commentPost(opDdb, {data: commentedPost})
      const nextCommentedPost = await post(opDdb, {hk: commentedPost.hk})
      expect(nextCommentedPost.comments).toEqual(2)
    })
    it('addComment(비회원)', async function () {
      console.debug('비회원')
      const comment = createComment({
        data: {
          postId: commentedPost.hk,
          content: 'comment',
          priority: EPriority.Normal,
        },
      })
      const commented = await addComment(opDdb, {data: comment})
      console.table([comment, commented])
      expect(commented).toEqual(comment)
    })
    it('comments(3)', async function () {
      const {items} = await comments(opDdb, {
        postId: commentedPost.hk,
      })
      console.debug('comments')
      console.table(items)
      expect(items).toHaveLength(3)
    })
    it('commentPost(3), Post 의 comments 값도 증가', async function () {
      await commentPost(opDdb, {data: commentedPost})
      const nextCommentedPost = await post(opDdb, {hk: commentedPost.hk})
      expect(nextCommentedPost.comments).toEqual(3)
    })
  })
})

