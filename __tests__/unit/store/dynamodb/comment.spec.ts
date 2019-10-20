import {EEntity, EPriority} from '../../../../src/entity/enum'
import {Post} from '../../../../src/entity/post'
import {getInitialData} from '../../../setup'
import {opDdb} from '../../../env'
import {createComment} from '../../../../src/entity/comment'
import {addComment} from '../../../../src/store/dynamodb/add-comment'
import {removeComment} from '../../../../src/store/dynamodb/remove-comment'
import {updateComment} from '../../../../src/store/dynamodb/update-comment'
import {comments} from '../../../../src/store/dynamodb/comments'
import {commentPost} from '../../../../src/store/dynamodb/comment-post'
import {commentsByUserId} from '../../../../src/store/dynamodb/comments-by-user-id'
import {commentsByPostId} from '../../../../src/store/dynamodb/comments-by-post-id'
import {post} from '../../../../src/store/dynamodb/post'
import {posts} from '../../../../src/store/dynamodb/posts'
import {removePost} from '../../../../src/store/dynamodb/remove-post'
import {likeComment} from '../../../../src/store/dynamodb/like-comment'
import {unlikeComment} from '../../../../src/store/dynamodb/unlike-comment'

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
          it('post.children(1)', async function () {
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

            it('post.children(1), 삭제되도 코멘트 수는 유지', async function () {
              const nextCommentedPost = await post(opDdb, {hk: commentedPost.hk})
              expect(nextCommentedPost.children).toEqual(3)
            })
          })

          describe('updateComment', function() {
            it('updateComment', async() => {
              const {items: before} = await comments(opDdb, {postId: commentedPost.hk})
              const [comment] = before

              const content = 'updated content'
              const updatedAt = new Date().toISOString()
              const isUpdated = await updateComment(opDdb, {
                  hk: comment.hk,
                  content,
                  updatedAt
              })

              const {items: after} = await comments(opDdb, {postId: commentedPost.hk})
              expect(before[0].content).not.toEqual(content)
              expect(after[0].content).toEqual(content)

              console.table(before)
              console.table(after)
            })
          })

          describe('likeComment', function() {
            it('likeComment', async () => {
              const {items: before} = await comments(opDdb, {postId: commentedPost.hk})
              const isLiked = await likeComment(opDdb, {hk: before[0].hk})
              expect(isLiked).toEqual(true)

              const {items: after} = await comments(opDdb, {postId: commentedPost.hk})
              expect(after[0].likes).toEqual(before[0].likes + 1)

              console.table(before)
              console.table(after)
            })
          })

          describe('unlikeComment', function() {
            it('unlikeComment', async () => {
              const {items: before} = await comments(opDdb, {postId: commentedPost.hk})
              const isUnliked = await unlikeComment(opDdb, {hk: before[0].hk})
              expect(isUnliked).toEqual(true)

              const {items: after} = await comments(opDdb, {postId: commentedPost.hk})
              expect(after[0].likes).toEqual(before[0].likes - 1)

              console.table(before)
              console.table(after)
            })
          })
        })

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

          // aSsi 유저의 코멘트 조회 -> 코멘트 추가 -> 코멘트 재조회
          it('코멘트 리스트 aSsi', async () => {
            const {items} = await commentsByUserId(opDdb, {userId: 'aSsi'})
            console.debug('코멘트 리스트 aSsi')
            console.table(items)
            expect(items.length).toEqual(0)
          })
          it('회원 aSsi 코멘트 추가 -> 코멘트 리스트 aSsi (재조회) -> Post 의 children 값 증가 확인', async () => {
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

            console.log('Post 의 children 값도 증가')
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

