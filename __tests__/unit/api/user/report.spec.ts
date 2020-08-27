import {yiguana} from '../../../env'
import {member_a, member_d} from '../../../__data__/user'
import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'

describe('unit', () => {
  describe('api', () => {
    describe('user', () => {
      describe('report', () => {
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

        it('user a, report post list === 0', async () => {
          const {items} = await yiguana.user.report.list({
            data: {
              entity: Yiguana.EntityType.Post,
            },
            user: member_a,
          })
          expect(items.length).toEqual(0)
        })
        it('user a, report comment list === 0', async () => {
          const {items} = await yiguana.user.report.list({
            data: {
              entity: Yiguana.EntityType.Comment,
            },
            user: member_a,
          })
          expect(items.length).toEqual(0)
        })
        it('create report -> user d, report post list === 1', async () => {
          await yiguana.user.report.create({
            data: {
              data: post,
              content: 'text report content',
              createdAt: new Date().toISOString(),
            },
            user: member_d,
          })
          const {items} = await yiguana.user.report.list({
            data: {
              entity: Yiguana.EntityType.Post,
            },
            user: member_d,
          })
          console.table(items)
          expect(items.length).toEqual(1)
        })
        it('create report -> user d, report comment list === 1', async () => {
          await yiguana.user.report.create({
            data: {
              data: comment,
              content: 'text report content',
              createdAt: new Date().toISOString(),
            },
            user: member_d,
          })
          const {items} = await yiguana.user.report.list({
            data: {
              entity: Yiguana.EntityType.Comment,
            },
            user: member_d,
          })
          console.table(items)
          expect(items.length).toEqual(1)
        })
      })
    })
  })
})