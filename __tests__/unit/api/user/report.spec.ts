import {createApi} from '../../../../src/api'
import {bucketName, ddbClient, s3Client, tableName} from '../../../env'
import {member_a, member_d} from '../../../__data__/user'
import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {EEntity} from '../../../../src/type'

describe('unit', () => {
  describe('api', () => {
    describe('user', () => {
      describe('report', () => {
        const api = createApi({ddbClient, s3Client, tableName, bucketName})
        let post: Post
        let comment: Comment

        beforeAll(async () => {
          post = await api.post.create({
            data: {
              category: 'news',
              title: 'title',
              content: 'content',
            },
            user: member_a,
          })
          comment = await api.comment.create({
            data: {
              postId: post.hk,
              content: 'init data',
            },
            user: member_a,
          })
        })

        it('user a, report post list === 0', async () => {
          const {items} = await api.user.report.list({
            data: {
              entity: EEntity.Post,
            },
            user: member_a,
          })
          expect(items.length).toEqual(0)
        })
        it('user a, report comment list === 0', async () => {
          const {items} = await api.user.report.list({
            data: {
              entity: EEntity.Comment,
            },
            user: member_a,
          })
          expect(items.length).toEqual(0)
        })
        it('create report -> user d, report post list === 1', async () => {
          await api.user.report.create({
            data: {
              data: post,
              content: 'text report content',
              createdAt: new Date().toISOString(),
            },
            user: member_d,
          })
          const {items} = await api.user.report.list({
            data: {
              entity: EEntity.Post,
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