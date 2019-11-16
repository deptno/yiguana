import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {getInitialData} from '../../../setup'
import {EEntity} from '../../../../src/entity/enum'
import {replies} from '../../../../src/store/dynamodb/replies'
import {opDdb} from '../../../env'
import {addReply} from '../../../../src/store/dynamodb/add-reply'
import {createReply} from '../../../../src/entity/reply'
import {replyComment} from '../../../../src/store/dynamodb/reply-comment'
import {comments} from '../../../../src/store/dynamodb/comments'
import {updateReply} from '../../../../src/store/dynamodb/update-reply'
import {removeReply} from '../../../../src/store/dynamodb/remove-reply'
import {member_a, member_f, non_member_a} from '../../../__data__/user'
import {createLike} from '../../../../src/entity/like'
import {addLike} from '../../../../src/store/dynamodb/add-like'
import {likeReply} from '../../../../src/store/dynamodb/like-reply'
import {repliesByUserId} from '../../../../src/store/dynamodb/replies-by-user-id'

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
          it('초기 replies(0)', async () => {
            const {items} = await replies(opDdb, {comment})
            expect(items.length).toEqual(0)
          })
          it('addReply -> replies(1)', async () => {
            const reply = createReply({
              data: {
                comment,
                content: 'reply content',
                createdAt: new Date().toISOString(),
              },
              user: non_member_a
            })
            const replied = await addReply(opDdb, {
              data: reply,
            })
            console.log({replied})
            const {items} = await replies(opDdb, {comment})
            expect(items.length).toEqual(1)
            console.table(items)
          })
          it('BEFORE replyComment, comment.children(0) ', async () => {
            const {items} = await comments(opDdb, {postId: commentedPost.hk})
            const repliedComment = items.find(c => c.hk === commentId)!
            expect(repliedComment.children).toEqual(0)
          })
          it.todo('replyComment 대신 commentPost 가 사용되어야 한다.')
          xit('AFTER replyComment, comment.children(1) ', async () => {
            await replyComment(opDdb, {data: comment})
            const {items} = await comments(opDdb, {postId: commentedPost.hk})
            const repliedComment = items.find(c => c.hk === commentId)!
            expect(repliedComment.children).toEqual(1)
          })
          it('update reply', async() => {
            const {items: commentItems} = await comments(opDdb, {postId: commentedPost.hk})
            const repliedComment = commentItems.find(c => c.hk === commentId)!

            const {items: replyItems} = await replies(opDdb, {comment: repliedComment})
            const targetReply = replyItems[0]
            expect(targetReply).not.toEqual(undefined)

            const content = 'updated reply content'
            await updateReply(opDdb, {
              data: {
                hk: targetReply.hk,
                commentId,
                content,
              }
            })
            const {items: after} = await replies(opDdb, {comment: repliedComment})
            console.table(after) // expect 비교군이 생각이 안 나고 일단 로그로 확인하라
          })
          it('like reply', async() => {
            const {items: commentItems} = await comments(opDdb, {postId: commentedPost.hk})
            const repliedComment = commentItems.find(c => c.hk === commentId)!

            const {items: replyItems} = await replies(opDdb, {comment: repliedComment})
            const targetReply = replyItems[0]
            expect(targetReply).not.toEqual(undefined)

            const like = createLike({
              data: {
                data: targetReply as unknown as Comment,
                createdAt: new Date().toISOString()
              },
              user: member_f,
            })
            const saved = await addLike(opDdb, {data: like})
            console.log({saved})

            const likedReply = await likeReply(opDdb, {data: targetReply})
            expect(likedReply.hk).toEqual(targetReply.hk)
            expect(likedReply.likes).toEqual(targetReply.likes + 1)
          })
          // a 유저의 답글 조회 -> 답글 추가 -> 답글 재조회
          it('repliesByUserId: 답글 리스트 a', async() => {
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
            const replied  = await addReply(opDdb, {data: reply})
            console.table([reply, replied])
            expect(replied).toEqual(reply)

            console.log('답글 리스트 a (재조회)')
            const {items} = await repliesByUserId(opDdb, {userId: member_a.id})
            console.debug('답글 리스트 a')
            console.table(items)
            expect(items.length).toEqual(1)
          })
          it('remove reply', async() => {
            const {items: commentItems} = await comments(opDdb, {postId: commentedPost.hk})
            const repliedComment = commentItems.find(c => c.hk === commentId)!

            const {items: replyItems} = await replies(opDdb, {comment: repliedComment})
            const targetReply = replyItems[0]
            expect(targetReply).not.toEqual(undefined)

            const isRemoved = await removeReply(opDdb, {hk: targetReply.hk})
            expect(isRemoved).toEqual(true)
            const {items: after} = await replies(opDdb, {comment: repliedComment})
            console.table(after) // expect 비교군이 생각이 안 나고 일단 로그로 확인하라
          })
        })
      })
    })
  })
})
