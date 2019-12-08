import {createApi} from '../../../../src/api'
import {bucketName, ddbClient, s3Client, tableName} from '../../../env'
import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {admin, member_a} from '../../../__data__/user'
import {EEntity} from '../../../../src/type'
import {EYiguanaError} from '../../../../src/lib/assert'

describe('unit', () => {
  describe('api', () => {
    describe('administrator', () => {
      describe('aggReport', () => {
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

        it('aggReports() require admin permission', async() => {
          try {
            await api.administrator.aggReport.list({
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
        it('aggReports() === 0', async() => {
          const {items} = await api.administrator.aggReport.list({
            data: {
              entity: EEntity.Post,
            },
            /*
             * FIXME:
             *  src/api/administrator/agg-report/list.ts 에서
             *  assertsAdmin으로 유저 체크하고 있어서 아래 user 객체로는 admin만 유효한데
             *  ApiInputWithUser<AggReportsInput>에서 허용하는 User 객체로는 admin이 맞지 않는 상태
             */
            user: admin,
          })
          expect(items.length).toEqual(0)
        })
      })
    })
  })
})