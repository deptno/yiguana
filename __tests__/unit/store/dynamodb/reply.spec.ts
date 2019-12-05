import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {getInitialData} from '../../../setup'
import {opDdb} from '../../../env'
import {addReply} from '../../../../src/store/dynamodb/add-reply'
import {createReply} from '../../../../src/entity/reply'
import {comments} from '../../../../src/store/dynamodb/comments'
import {member_a, member_f, non_member_a} from '../../../__data__/user'
import {createLike} from '../../../../src/entity/like'
import {addLike} from '../../../../src/store/dynamodb/add-like'
import {likeReply} from '../../../../src/store/dynamodb/like-reply'
import {repliesByUserId} from '../../../../src/store/dynamodb/replies-by-user-id'
import {EEntity} from '../../../../src/type'

describe('unit', function () {
  describe('store', function () {
    describe('dynamodb', function () {
      describe('reply', function () {

        let postList: Post[]
        let commentedPost: Post
        let commentList: Comment[]
        let comment: Comment
        let commentId: string

        beforeAll(() => getInitialData().then(data => {
          postList = data.filter(d => d.rk === EEntity.Post) as Post[]
          commentedPost = postList[4]
          commentList = data.filter(d => d.rk === EEntity.Comment) as Comment[]

          comment = commentList.find(c => c.postId === commentedPost.hk)!
          expect(comment).toBeDefined()
          commentId = comment.hk
        }))

        describe('replies', function () {
          it('addReply', async () => {
            const reply = createReply({
              data: {
                comment,
                content: 'reply content',
                createdAt: new Date().toISOString(),
              },
              user: non_member_a,
            })
            const replied = await addReply(opDdb, {data: reply})
            const {items} = await comments(opDdb, {postId: comment.postId})
            expect(items.filter(c => c.commentId === replied.commentId).length).toEqual(1)
          })
          it('BEFORE replyComment, comment.children(0) ', async () => {
            const {items} = await comments(opDdb, {postId: commentedPost.hk})
            const repliedComment = items.find(c => c.hk === commentId)!
            expect(repliedComment.children).toEqual(0)
          })
          it('like reply', async () => {
            const {items} = await comments(opDdb, {postId: commentedPost.hk})
            const reply = items.find(c => c.commentId === commentId)!

            expect(reply).not.toEqual(undefined)

            const like = createLike({
              data: {
                data: reply,
                createdAt: new Date().toISOString(),
              },
              user: member_f,
            })
            const saved = await addLike(opDdb, {data: like})
            console.log({saved})

            const likedReply = await likeReply(opDdb, {data: reply})
            expect(likedReply.hk).toEqual(reply.hk)
            expect(likedReply.likes).toEqual(reply.likes + 1)
          })
          // a 유저의 답글 조회 -> 답글 추가 -> 답글 재조회
          it('repliesByUserId: 답글 리스트 a', async () => {
            const {items} = await repliesByUserId(opDdb, {userId: member_a.id})
            console.debug('reply 리스트 userId')
            console.table(items)
            expect(items.length).toEqual(0)
          })
          it('회원 a 답글 추가 -> 답글 리스트 a (재조회)', async () => {
            console.debug('회원 답글 추가')
            const reply = createReply({
              data: {
                comment,
                content: 'a gun reply',
                createdAt: new Date().toISOString(),
              },
              user: member_a,
            })
            const replied = await addReply(opDdb, {data: reply})
            console.table([reply, replied])
            expect(replied).toEqual(reply)

            console.log('답글 리스트 a (재조회)')
            const {items} = await repliesByUserId(opDdb, {userId: member_a.id})
            console.debug('답글 리스트 a')
            console.table(items)
            expect(items.length).toEqual(1)
          })
        })
      })
    })
  })
})
