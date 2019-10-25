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
              user: {
                name: 'not member',
                pw: 'password',
                ip: '0.0.0.1'
              }
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
            console.log({repliedComment}) // reply가 있는 코멘트 획득했으나, 이는 코멘트 객체이므로 reply hk 값은 알 수 없음

            // TODO: comment 객체로부터 reply의 hk를 어떻게 얻을지
            // const {items} = await replies(opDdb, {commentId})
            // 위처럼 items 얻은 다음 거기에서 하나 꺼내서, 그럼 이건 reply 객체니까 그거의 hk를 쓰려고 했는데
            // 이렇게 했더니 items 타입이 reply가 아니라서 hk를 참조하지 못해서 에러 발생

            const content = 'updated reply content'
            const isUpdated = await updateReply(opDdb, { // 업데이트 주체는 reply이므로 reply의 hk 값이 필요
              data: {
                hk: targetReply.hk, // 업데이트할 reply(이를 targetReply라 한다)에 대한 hk
                commentId,
                content,
              }
            })
            console.log({isUpdated})
          })
          it.todo('remove reply')

        })
      })
    })
  })
})
