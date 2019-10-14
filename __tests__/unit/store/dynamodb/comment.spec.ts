import {Post} from '../../../../src/entity/post'
import {getInitialData} from '../../../setup'
import {opDdb} from '../../../env'
import {addComment} from '../../../../src/store/dynamodb/add-comment'
import {createComment} from '../../../../src/entity/comment'
import {comments} from '../../../../src/store/dynamodb/comments'
import {EEntity, EPriority} from '../../../../src/entity/enum'
import {post} from '../../../../src/store/dynamodb/post'
import {commentPost} from '../../../../src/store/dynamodb/comment-post'
import {removeComment} from '../../../../src/store/dynamodb/remove-comment'

describe('api', function () {
  let postList: Post[]
  let commentedPost: Post

  describe('comments', () => {
    beforeAll(async () =>
      getInitialData().then(data => {
        postList = data.filter(d => d.rk === EEntity.Comment) as Post[]
        commentedPost = postList[0]
      }))

    it('comments(1)', async function () {
      const {items} = await comments(opDdb, {postId: commentedPost.postId})
      console.debug('comments')
      console.table(items)

      expect(items.length).toEqual(1)
    })
    it('comments(1)', async function () {
      const {items} = await comments(opDdb, {postId: commentedPost.postId})
      const nextCommentedPost = await post(opDdb, {hk: commentedPost.postId})
      expect(nextCommentedPost.comments).toEqual(items.length)
    })
    it('addComment(회원)', async function () {
      console.debug('회원')
      const comment = createComment({
        data: {
          postId: commentedPost.postId,
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
        postId: commentedPost.postId,
      })
      console.debug('comments')
      console.table(items)
      expect(items).toHaveLength(2)
    })
    it('commentPost(2), Post 의 comments 값도 증가', async function () {
      await commentPost(opDdb, {data: commentedPost})
      const nextCommentedPost = await post(opDdb, {hk: commentedPost.postId})
      expect(nextCommentedPost.comments).toEqual(2)
    })
    it('addComment(비회원)', async function () {
      console.debug('비회원')
      const comment = createComment({
        data: {
          postId: commentedPost.postId,
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
        postId: commentedPost.postId,
      })
      console.debug('comments')
      console.table(items)
      expect(items).toHaveLength(3)
    })
    it('commentPost(3), Post 의 comments 값도 증가', async function () {
      await commentPost(opDdb, {data: commentedPost})
      const nextCommentedPost = await post(opDdb, {hk: commentedPost.postId})
      expect(nextCommentedPost.comments).toEqual(3)
    })

    describe('removeComment', function () {
      // 삭제된 코메트의 경우 삭제된 코멘트라고 표시되며 코멘트 수는 유지된다.

      it('removeComment', async () => {
        const {items: before} = await comments(opDdb, {postId: commentedPost.postId})
        const [comment] = before
        const isDeleted = await removeComment(opDdb, {hk: comment.hk})

        expect(isDeleted).toEqual(true)

        const {items: after} = await comments(opDdb, {postId: commentedPost.postId})
        expect(after.length).toEqual(before.length)

        console.table(before)
        console.table(after)
      })

      it('post.comments(1), 삭제되도 코멘트 수는 유지', async function () {
        const nextCommentedPost = await post(opDdb, {hk: commentedPost.postId})
        expect(nextCommentedPost.comments).toEqual(1)
      })
    })
  })

  describe('commentsByUserId', () => {
    beforeAll(async () =>
      getInitialData().then(data => {
        postList = data.filter(d => d.rk === EEntity.Post) as Post[]
        commentedPost = postList[0]
      }))

    it('todo', async () => {

    })
  })
  // todo commentsByUserId 에 대한 구현
})

