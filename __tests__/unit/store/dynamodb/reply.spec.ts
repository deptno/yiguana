import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {getInitialData} from '../../../setup'
import {EEntity} from '../../../../src/entity/enum'
import {replies} from '../../../../src/store/dynamodb/replies'
import {opDdb} from '../../../env'
import {addReply} from '../../../../src/store/dynamodb/add-reply'
import {createReply, Reply} from '../../../../src/entity/reply/reply'
import {replyComment} from '../../../../src/store/dynamodb/reply-comment'
import {comments} from '../../../../src/store/dynamodb/comments'
import {updateReply} from '../../../../src/store/dynamodb/update-reply'
import {removeReply} from '../../../../src/store/dynamodb/remove-reply'
import {non_member_a} from '../../../__data__/user'

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
          comment = commentList[0]
          commentId = comment.hk
        }))

        describe('replies', function () {
          it('초기 replies(0)', async () => {
            const {items} = await replies(opDdb, {commentId})
            expect(items.length).toEqual(0)
          })
          it('addReply -> replies(1)', async () => {
            const reply = createReply({
              data: {
                commentId,
                content: 'reply content',
                createdAt: new Date().toISOString(),
              },
              user: non_member_a
            })
            const replied = await addReply(opDdb, {
              data: reply,
            })
            console.log({replied})
            const {items} = await replies(opDdb, {commentId})
            expect(items.length).toEqual(1)
            console.table(items)
          })
          it('BEFORE replyComment, comment.children(0) ', async () => {
            const {items} = await comments(opDdb, {postId: commentedPost.hk})
            const repliedComment = items.find(c => c.hk === commentId)!
            expect(repliedComment.children).toEqual(0)
          })
          it('AFTER replyComment, comment.children(1) ', async () => {
            await replyComment(opDdb, {data: comment})
            const {items} = await comments(opDdb, {postId: commentedPost.hk})
            const repliedComment = items.find(c => c.hk === commentId)!
            expect(repliedComment.children).toEqual(1)
          })
          it('update reply', async() => {
            const {items: commentItems} = await comments(opDdb, {postId: commentedPost.hk})
            const repliedComment = commentItems.find(c => c.hk === commentId)!

            const {items: replyItems} = await replies(opDdb, {commentId: repliedComment.hk})
            const targetReply = replyItems[0]
            expect(targetReply).not.toEqual(undefined)

            const content = 'updated reply content'
            const isUpdated = await updateReply(opDdb, {
              data: {
                hk: targetReply.hk,
                commentId,
                content,
              }
            })
            const {items: after} = await replies(opDdb, {commentId: repliedComment.hk})
            console.table(after) // expect 비교군이 생각이 안 나고 일단 로그로 확인하라
          })
          it('remove reply', async() => {
            const {items: commentItems} = await comments(opDdb, {postId: commentedPost.hk})
            const repliedComment = commentItems.find(c => c.hk === commentId)!

            const {items: replyItems} = await replies(opDdb, {commentId: repliedComment.hk})
            const targetReply = replyItems[0]
            expect(targetReply).not.toEqual(undefined)

            const isRemoved = await removeReply(opDdb, {hk: targetReply.hk})
            expect(isRemoved).toEqual(true)
            const {items: after} = await replies(opDdb, {commentId: repliedComment.hk})
            console.table(after) // expect 비교군이 생각이 안 나고 일단 로그로 확인하라
          })
        })
      })
    })
  })
})
