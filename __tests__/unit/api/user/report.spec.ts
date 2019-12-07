import {createApi} from '../../../../src/api'
import {bucketName, ddbClient, s3Client, tableName} from '../../../env'
import {member_a} from '../../../__data__/user'
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
        })
        it('user a, report comment list === 0', async () => {
          const {items} = await api.user.report.list({
            data: {
              entity: EEntity.Comment,
            },
            user: member_a,
          })
        })
        it.todo('create report')
      })
    })
  })
})