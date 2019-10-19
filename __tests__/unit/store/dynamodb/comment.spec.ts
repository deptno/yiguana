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
import {commentsByUserId} from '../../../../src/store/dynamodb/comments-by-user-id'
import {removePost} from '../../../../src/store/dynamodb/remove-post'
import {posts} from '../../../../src/store/dynamodb/posts'
import {commentsByPostId} from '../../../../src/store/dynamodb/comments-by-post-id'

describe('unit', function () {
  describe('store', function () {
    describe('dynamodb', function () {
      describe('comment', function () {

        let postList: Post[]
        let commentedPost: Post

        describe('comments', () => {
          beforeAll(() => getInitialData().then(data => {
            postList = data.filter(d => d.rk === EEntity.Post) as Post[]
            commentedPost = postList[4]
          }))

          it('comments(1)', async function () {
            const {items} = await comments(opDdb, {postId: commentedPost.hk})
            console.debug('comments')
            console.table(items)

            expect(items.length).toEqual(1)
          })
          it('post.comments(1)', async function () {
            const {items} = await comments(opDdb, {postId: commentedPost.hk})
            const nextCommentedPost = await post(opDdb, {hk: commentedPost.hk})
            expect(nextCommentedPost.children).toEqual(items.length)
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
            expect(nextCommentedPost.children).toEqual(2)
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
            expect(nextCommentedPost.children).toEqual(3)
          })

          describe('removeComment', function () {
            // 삭제된 코메트의 경우 삭제된 코멘트라고 표시되며 코멘트 수는 유지된다.

            it('removeComment', async () => {
              const {items: before} = await comments(opDdb, {postId: commentedPost.hk})
              const [comment] = before
              const isDeleted = await removeComment(opDdb, {hk: comment.hk})

              expect(isDeleted).toEqual(true)

              const {items: after} = await comments(opDdb, {postId: commentedPost.hk})
              expect(after.length).toEqual(before.length)

              console.table(before)
              console.table(after)
            })

            it('post.comments(1), 삭제되도 코멘트 수는 유지', async function () {
              const nextCommentedPost = await post(opDdb, {hk: commentedPost.hk})
              expect(nextCommentedPost.children).toEqual(3)
            })
          })
        })

        // todo commentsByUserId 에 대한 구현
        describe('commentsByUserId', () => {
          beforeAll(() => getInitialData().then(data => {
            postList = data.filter(d => d.rk === EEntity.Post) as Post[]
            commentedPost = postList[4]
          }))

          it('comment 리스트 userId', async () => {
            const {items} = await commentsByUserId(opDdb, {userId: 'userId'})
            console.debug('comment 리스트 userId')
            console.table(items)
            expect(items.length).toEqual(1)
          })

          /* TODO: [궁금] 이런 식으로 순차 흐름인 통합 테스트일 때
           *  각각을 it으로 나누는 게 정석인지 it 안에 묶어서 한 덩어리로 진행하는 것이 정석인지?
           */
          // aSsi 유저의 코멘트 조회 -> 코멘트 추가 -> 코멘트 재조회
          it('코멘트 리스트 aSsi (1)', async () => {
            const {items} = await commentsByUserId(opDdb, {userId: 'aSsi'})
            console.debug('코멘트 리스트 aSsi')
            console.table(items)
            expect(items.length).toEqual(0)
          })
          it('코멘트 리스트 aSsi (2)', async () => {
            console.debug('회원 코멘트 추가')
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

            console.log('코멘트 리스트 aSsi (재조회)')
            const {items} = await commentsByUserId(opDdb, {userId: 'aSsi'})
            console.debug('코멘트 리스트 aSsi')
            console.table(items)
            expect(items.length).toEqual(1)

            console.log('Post 의 Comments 값도 증가')
            await commentPost(opDdb, {data: commentedPost})
            const nextCommentedPost = await post(opDdb, {hk: commentedPost.hk})
            expect(nextCommentedPost.children).toEqual(2)
          })
        })

        describe('commentsByPostId', () => {
          beforeAll(() => getInitialData().then(data => {
            postList = data.filter(d => d.rk === EEntity.Post) as Post[]
            commentedPost = postList[4]
          }))

          it('코멘트 리스트 postId', async () => {
            const {items} = await commentsByPostId(opDdb, {postId: commentedPost.hk})
            console.debug('코멘트 리스트 postId')
            console.table(items)
            expect(items.length).toEqual(1)
          })
        })

        describe('removePost', () => {
          beforeAll(() => getInitialData().then(data => {
            postList = data.filter(d => d.rk === EEntity.Post) as Post[]
            commentedPost = postList[4]
          }))

          it('포스트 삭제 -> 코멘트 삭제', async () => {
            console.log('포스트 삭제')
            const {items: beforePost} = await posts(opDdb, {})
            const isDeletedPost = await removePost(opDdb, {hk: commentedPost.hk})
            expect(isDeletedPost).toEqual(true)

            const {items: afterPost} = await posts(opDdb, {})
            expect(afterPost.length).toEqual(beforePost.length - 1)

            console.table(afterPost)

            console.log('코멘트 삭제')
            const {items: beforeComments} = await comments(opDdb, {postId: commentedPost.hk})
            const [comment] = beforeComments
            const isDeletedComment = await removeComment(opDdb, {hk: comment.hk})

            expect(isDeletedComment).toEqual(true)

            const {items: afterComments} = await comments(opDdb, {postId: commentedPost.hk})
            expect(afterComments.length).toEqual(beforeComments.length)

            console.table(beforeComments)
            console.table(afterComments)

            console.log('삭제되어도 코멘트 수는 유지')
            const nextCommentedPost = await post(opDdb, {hk: commentedPost.hk})
            expect(nextCommentedPost.children).toEqual(1)
          })
        })
      })
    })
  })
})

