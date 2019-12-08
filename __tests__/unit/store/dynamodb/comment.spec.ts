import {Comment, Post} from '../../../../src/entity'
import {getInitialData} from '../../../setup'
import {opDdb} from '../../../env'
import {createComment} from '../../../../src/entity/comment'
import {removeComment} from '../../../../src/store/dynamodb/remove-comment'
import {getComments} from '../../../../src/store/dynamodb/get-comments'
import {commentPost} from '../../../../src/store/dynamodb/comment-post'
import {getCommentsByUserId} from '../../../../src/store/dynamodb/get-comments-by-user-id'
import {commentsByPostId} from '../../../../src/store/dynamodb/comments-by-post-id'
import {getPosts} from '../../../../src/store/dynamodb/get-posts'
import {removePost} from '../../../../src/store/dynamodb/remove-post'
import {incLikes} from '../../../../src/store/dynamodb/inc-likes'
import {createLike} from '../../../../src/entity/like'
import {addLike} from '../../../../src/store/dynamodb/add-like'
import {member_d, member_e} from '../../../__data__/user'
import {EEntity, EEntityStatus} from '../../../../src/type'
import {removeLike} from '../../../../src/store/dynamodb/remove-like'
import {put} from '../../../../src/store/dynamodb/raw/put'
import {get} from '../../../../src/store/dynamodb/raw/get'
import {decLikes} from '../../../../src/store/dynamodb/dec-likes'

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
            const {items} = await getComments(opDdb, {postId: commentedPost.hk})
            console.debug('comments')
            console.table(items)

            expect(items.length).toEqual(1)
          })
          it('post.children(1)', async function () {
            const {items} = await getComments(opDdb, {postId: commentedPost.hk})
            const nextCommentedPost = await get<Post>(opDdb, commentedPost)

            console.table(items)

            expect(nextCommentedPost.children).toEqual(items.length)
          })
          it('addComment(회원)', async function () {
            console.debug('회원')
            const comment = createComment({
              data: {
                postId: commentedPost.hk,
                content: 'comment',
                createdAt: new Date().toISOString()
              },
              user: member_e,
            })
            const commented = await put<Comment>(opDdb, comment)
            console.table([comment, commented])
            expect(commented).toEqual(comment)
          })
          it('comments(2)', async function () {
            const {items} = await getComments(opDdb, {
              postId: commentedPost.hk,
            })
            console.debug('comments')
            console.table(items)
            expect(items).toHaveLength(2)
          })
          it('commentPost(2), PostPage 의 comments 값도 증가', async function () {
            await commentPost(opDdb, {data: commentedPost})
            const nextCommentedPost = await get<Post>(opDdb, commentedPost)
            expect(nextCommentedPost.children).toEqual(2)
          })
          it('addComment(비회원)', async function () {
            console.debug('비회원')
            const comment = createComment({
              data: {
                postId: commentedPost.hk,
                content: 'comment',
                createdAt: new Date().toISOString()
              },
              user: member_e
            })
            const commented = await put<Comment>(opDdb, comment)
            console.table([comment, commented])
            expect(commented).toEqual(comment)
          })
          it('comments(3)', async function () {
            const {items} = await getComments(opDdb, {
              postId: commentedPost.hk,
            })
            console.debug('comments')
            console.table(items)
            expect(items).toHaveLength(3)
          })
          it('commentPost(3), PostPage 의 comments 값도 증가', async function () {
            await commentPost(opDdb, {data: commentedPost})
            const nextCommentedPost = await get<Post>(opDdb, commentedPost)
            expect(nextCommentedPost.children).toEqual(3)
          })

          describe('removeComment', function () {
            // 삭제된 코메트의 경우 삭제된 코멘트라고 표시되며 코멘트 수는 유지된다.

            it('removeComment', async () => {
              const {items: before} = await getComments(opDdb, {postId: commentedPost.hk})
              const [comment] = before
              const deletedComment = await removeComment(opDdb, {hk: comment.hk})

              expect(deletedComment).toMatchObject(comment)

              const {items: after} = await getComments(opDdb, {postId: commentedPost.hk})
              expect(after.length).toEqual(before.length)

              console.table(before)
              console.table(after)
            })

            it('post.children(1), 삭제되도 코멘트 수는 유지', async function () {
              const nextCommentedPost = await get<Post>(opDdb, commentedPost)
              expect(nextCommentedPost.children).toEqual(3)
            })
          })

          describe('likeComment', function() {
            it('likeComment', async () => {
              const {items: before} = await getComments(opDdb, {postId: commentedPost.hk})
              const like = createLike({
                data: {
                  data: before[0],
                  createdAt: new Date().toISOString()
                },
                user: member_e
              })
              const saved = await addLike(opDdb, like)
              console.log({saved})

              const likedComment = await incLikes(opDdb, before[0])
              expect(likedComment.hk).toEqual(before[0].hk)
              expect(likedComment.likes).toEqual(before[0].likes + 1)

              const {items: after} = await getComments(opDdb, {postId: commentedPost.hk})
              expect(after[0].likes).toEqual(before[0].likes + 1)

              console.table(before)
              console.table(after)
            })
          })

          describe('unlikeComment', function() {
            it('unlikeComment', async () => {
              const {items: before} = await getComments(opDdb, {postId: commentedPost.hk})
              await removeLike(opDdb, {data: before[0], userId: member_e.id})
              await decLikes(opDdb, before[0])
              const {items: after} = await getComments(opDdb, {postId: commentedPost.hk})
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
            const {items} = await getCommentsByUserId(opDdb, {userId: member_d.id})
            console.debug('comment 리스트 userId')
            console.table(items)
            expect(items.length).toEqual(1)
          })

          // e 유저의 코멘트 조회 -> 코멘트 추가 -> 코멘트 재조회
          it('코멘트 리스트 e', async () => {
            const {items} = await getCommentsByUserId(opDdb, {userId: member_e.id})
            console.debug('코멘트 리스트 e')
            console.table(items)
            expect(items.length).toEqual(0)
          })
          it('회원 e 코멘트 추가 -> 코멘트 리스트 e (재조회) -> PostPage 의 children 값 증가 확인', async () => {
            console.debug('회원 코멘트 추가')
            const comment = createComment({
              data: {
                postId: commentedPost.hk,
                content: 'comment',
                createdAt: new Date().toISOString()
              },
              user: member_e,
            })
            const commented = await put<Comment>(opDdb, comment)
            console.table([comment, commented])
            expect(commented).toEqual(comment)

            console.log('코멘트 리스트 e (재조회)')
            const {items} = await getCommentsByUserId(opDdb, {userId: member_e.id})
            console.debug('코멘트 리스트 e')
            console.table(items)
            expect(items.length).toEqual(1)

            console.log('PostPage 의 children 값도 증가')
            await commentPost(opDdb, {data: commentedPost})
            const nextCommentedPost = await get<Post>(opDdb, commentedPost)
            console.log(nextCommentedPost.children)
            expect(nextCommentedPost.children).toEqual(2)
          })
        })

        describe('commentsByPostId', () => {
          beforeAll(() => getInitialData().then(data => {
            postList = data.filter(d => d.rk === EEntity.Post) as Post[]
            commentedPost = postList[4]
          }))

          it('코멘트 리스트 commentId', async () => {
            const {items} = await commentsByPostId(opDdb, {postId: commentedPost.hk})
            console.debug('코멘트 리스트 commentId')
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
            const {items: beforePost} = await getPosts(opDdb, {})
            const removedPost = await removePost(opDdb, {hk: commentedPost.hk})
            expect(removedPost).toBeDefined()
            expect(removedPost.hk).toEqual(commentedPost.hk)

            const {items: afterPost} = await getPosts(opDdb, {})
            expect(afterPost.length).toEqual(beforePost.length)
            expect(
              afterPost.filter(p => p.status === EEntityStatus.deletedByUser).length
            ).toEqual(1)

            console.table(afterPost)

            console.log('코멘트 삭제')
            const {items: beforeComments} = await getComments(opDdb, {postId: commentedPost.hk})
            const [comment] = beforeComments
            const deletedComment = await removeComment(opDdb, {hk: comment.hk})

            expect(deletedComment).toMatchObject(comment)

            const {items: afterComments} = await getComments(opDdb, {postId: commentedPost.hk})
            expect(afterComments.length).toEqual(beforeComments.length)

            console.table(beforeComments)
            console.table(afterComments)

            console.log('삭제되어도 코멘트 수는 유지')
            const nextCommentedPost = await get<Post>(opDdb, commentedPost)
            expect(nextCommentedPost.children).toEqual(1)
          })
        })
      })
    })
  })
})

