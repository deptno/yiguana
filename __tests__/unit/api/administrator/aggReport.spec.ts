import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {admin, member_a, member_e} from '../../../__data__/user'
import {EEntity} from '../../../../src/type'
import {EYiguanaError} from '../../../../src/lib/assert'
import {yiguana} from '../../../env'

describe('unit', () => {
  describe('api', () => {
    describe('administrator', () => {
      describe('aggReport', () => {
        let post: Post
        let comment: Comment

        beforeAll(async () => {
          post = await yiguana.post.create({
            data: {
              category: 'news',
              title: 'title',
              content: 'content',
            },
            user: member_a,
          })
          comment = await yiguana.comment.create({
            data: {
              postId: post.hk,
              content: 'init data',
              createdAt: new Date().toISOString()
            },
            user: member_a,
          })
        })

        it('aggReports() require admin permission', async () => {
          try {
            await yiguana.administrator.aggReport.list({
              data: {
                entity: EEntity.Post,
              },
              user: member_a,
            })
            expect(false).toEqual(true)
          } catch (e) {
            expect(e.message).toEqual(EYiguanaError.admin_access_only)
          }
        })
        it('aggReports() === 0', async () => {
          const {items} = await yiguana.administrator.aggReport.list({
            data: {
              entity: EEntity.Post,
            },
            user: admin,
          })
          expect(items.length).toEqual(0)
        })
        it('create report post, aggReports() === 1', async () => {
          await yiguana.user.report.create({
            data: {
              data: post,
              content: 'text report content',
              createdAt: new Date().toISOString(),
            },
            user: member_e,
          })
          const {items} = await yiguana.administrator.aggReport.list({
            data: {
              entity: EEntity.Post,
            },
            user: admin,
          })
          expect(items.length).toEqual(1)
        })
        it('create report comment, aggReports() === 1', async () => {
          await yiguana.user.report.create({
            data: {
              data: comment,
              content: 'text report content',
              createdAt: new Date().toISOString(),
            },
            user: member_e,
          })
          const {items} = await yiguana.administrator.aggReport.list({
            data: {
              entity: EEntity.Comment,
            },
            user: admin,
          })
          expect(items.length).toEqual(1)
        })
      })
    })
  })
})