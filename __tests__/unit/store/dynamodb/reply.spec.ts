import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {getInitialData} from '../../../setup'
import {EEntity} from '../../../../src/entity/enum'
import {replies} from '../../../../src/store/dynamodb/replies'
import {opDdb} from '../../../env'
import {addComment} from '../../../../src/store/dynamodb/add-comment'

describe('unit', function () {
  describe('store', function () {
    describe('dynamodb', function () {
      describe('reply', function () {

        let postList: Post[]
        let commentedPost: Post
        let commentList: Comment[]
        let comment: Comment

        beforeAll(() => getInitialData().then(data => {
          postList = data.filter(d => d.rk === EEntity.Post) as Post[]
          commentedPost = postList[4]
          commentList = data.filter(d => d.rk === EEntity.Comment) as Comment[]
          comment = commentList[0]
        }))

        describe('replies', function () {
          it('replies(0)', async () => {
            const {items} = await replies(opDdb, {commentId: comment.hk})
            expect(items.length).toEqual(0)
          })
          it('addReply', async () => {
            const commented = await addComment(opDdb, {
              data: comment
            })
            console.log({commented})
            const {items} = await replies(opDdb, {commentId: comment.hk})
            expect(items.length).toEqual(0)
          })
        })

      })
    })
  })
})
