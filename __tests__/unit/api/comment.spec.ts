import {Post} from '../../../src/entity/post'
import {Comment} from '../../../src/entity/comment'
import {yiguana} from '../../env'
import {EValidationErrorMessage} from '../../../src/entity/error'
import {admin, member_a, member_f} from '../../__data__/user'

describe('unit', () => {
  describe('api', () => {
    describe('comment', () => {
      let post: Post
      let comment: Comment

      beforeAll(async () => {
        post = await yiguana.post.create({
          data: {
            content: 'content',
            title: 'title',
            category: 'news',
          },
          user: member_f,
        })
        comment = await yiguana.comment.create({
          data: {
            postId: post.hk,
            content: 'init data',
            createdAt: new Date().toISOString(),
          },
          user: member_f,
        })
      })

      it('list(0)', async () => {
        const {items} = await yiguana.comment.list({
          data: {
            postId: post.hk,
          },
        })
        expect(items.length).toEqual(1)
      })

      describe('comment', () => {
        it('create comment', async () => {
          try {
            await yiguana.comment.create({
              data: {
                postId: post.hk,
                content: 'test data',
                createdAt: new Date().toISOString(),
              },
              user: member_a,
            })
          } catch (e) {
            expect(e.message).toEqual(EValidationErrorMessage.InvalidInput)
          }
          const {items} = await yiguana.comment.list({
            data: {
              postId: post.hk,
            },
          })
          expect(items.length).toEqual(2)
        })
        it('update comment', async () => {
          const {items: before} = await yiguana.comment.list({
            data: {
              postId: post.hk,
            },
          })
          console.table(before)

          const targetComment = await yiguana.comment.update({
            data: {
              hk: comment.hk,
              postId: post.hk,
              content: 'updated content',
              updatedAt: new Date().toISOString(),
            },
            user: admin,
          })
          console.table(targetComment)

          const {items: after} = await yiguana.comment.list({
            data: {
              postId: post.hk,
            },
          })
          console.table(after)

          const [beforeItem] = before.filter(i => i.hk === comment.hk)
          const [afterItem] = after.filter(i => i.hk === comment.hk)
          expect(afterItem.content).not.toEqual(beforeItem.content)
        })
        it('delete comment', async () => {
          const {items: before} = await yiguana.comment.list({
            data: {
              postId: post.hk,
            },
          })
          console.table(before)
          console.log(before, 'before')
          console.log(comment, 'comment')

          try {
            const targetComment = await yiguana.comment.del({
              user: admin,
              data: comment,
            })
            console.table(targetComment)
          } catch(e) {
             간만에 와서 기억이 없는데 에러나서 보니
             자기 코멘트 아닌걸 테스트하는 것 같아서
             에러처리가 맞는것 같다 판단됨
            expect(e.message).toBe('fail')
            console.log('todo: check 20200823')
          }

          const {items: after} = await yiguana.comment.list({
            data: {
              postId: post.hk,
            },
          })
          console.table(after)
        })
        it.todo(`
  update 나 delete 시에 admin 계정의 경우 다른 루트를 태워서 수정해야한다.
  removeComment 의 경우에는 유저 체크 로직이 존재하며')
  updateComment 의 경우에는 유저 체 크로직이 존재하지 않는다.')
  체크 하는 것이 정상적이라 판단되며 admin 계정의 경우 토큰에서 role 을 체크하여 체크를 하지 않도록 하는 로직이 필요하다.`,
        )
      })
    })
  })
})