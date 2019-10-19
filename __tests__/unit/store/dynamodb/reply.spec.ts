import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {getInitialData} from '../../../setup'
import {EEntity} from '../../../../src/entity/enum'
import {replies} from '../../../../src/store/dynamodb/replies'
import {opDdb} from '../../../env'
import {addReply} from '../../../../src/store/dynamodb/add-reply'
import {createReply} from '../../../../src/entity/reply/reply'
import {replyComment} from '../../../../src/store/dynamodb/reply-comment'
import {comments} from '../../../../src/store/dynamodb/comments'

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
            })
            const replied = await addReply(opDdb, {
              data: reply,
            })
            console.log({replied})
            const {items} = await replies(opDdb, {commentId})
            expect(items.length).toEqual(1)
          })
          it('BEFORE replyComment, comment.children(0) ', async () => {
            const {items} = await comments(opDdb, {postId: commentedPost.hk})
            const repliedComment = items.find(c => c.hk === comment.hk)!
            expect(repliedComment.children).toEqual(0)
          })
          it('AFTER replyComment, comment.children(1) ', async () => {
            await replyComment(opDdb, {data: comment})
            const {items} = await comments(opDdb, {postId: commentedPost.hk})
            const repliedComment = items.find(c => c.hk === comment.hk)!
            expect(repliedComment.children).toEqual(1)
          })
          it.todo('update reply')
          it.todo('remove reply')

        })
      })
    })
  })
})
