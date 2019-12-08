import {createApi} from '../../../../src/api'
import {bucketName, ddbClient, s3Client, tableName} from '../../../env'
import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {admin, member_a} from '../../../__data__/user'

describe('unit', () => {
  describe('api', () => {
    describe('administrator', () => {
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
              createdAt: new Date().toISOString()
            },
            user: member_a,
          })
        })

        xit('aggReports() === 0', async () => {
          const {items} = await api.administrator.report.list({
            data: {
              data: post,
            },
            /*
             * FIXME:
             *  src/api/administrator/report/list.ts 에서
             *  assertsAdmin으로 유저 체크하고 있어서 아래 user 객체로는 admin만 유효한데
             *  ApiInputWithUser<ReportsInput>에서 허용하는 User 객체로는 admin이 맞지 않는 상태
             */
            user: member_a,
          })
        })
      })
    })
  })
})