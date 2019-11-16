import {report} from '../../../../src/store/dynamodb/report'
import {member_a, member_b} from '../../../__data__/user'
import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {getInitialData} from '../../../setup'
import {EEntity} from '../../../../src/entity/enum'
import {opDdb} from '../../../env'
import {postsByUserReport} from '../../../../src/store/dynamodb/posts-by-user-report'
import {createReport} from '../../../../src/entity/report'
import {addReport} from '../../../../src/store/dynamodb/add-report'
import {commentsByUserReport} from '../../../../src/store/dynamodb/comments-by-user-report'
import {removeReport} from '../../../../src/store/dynamodb/remove-report'
import {increaseReportAgg} from '../../../../src/store/dynamodb/increase-report-agg'

describe('unit', function () {
  describe('store', function () {
    describe('dynamodb', function () {
      describe('report', function () {

        describe('postByUserReport', function () {
          const user = member_a
          const userId = member_a.id
          const createdAt = new Date().toISOString()

          let postList: Post[]
          let data: Post
          let targetId: string
          let comment: Comment

          beforeAll(() => getInitialData().then(initialData => {
            [comment] = initialData.filter(d => d.rk === EEntity.Comment) as Comment[]
            postList = initialData.filter(d => d.rk === EEntity.Post) as Post[]
            [data] = postList
            targetId = data.hk
          }))

          it('01. postsByUserReport(User(a)) === 0', async () => {
            const {items} = await postsByUserReport(opDdb, {userId})
            expect(items.length).toEqual(0)
          })
          it('02. User(a)가 Post(0) 신고', async () => {
            const content = 'user a, post 0, 1st report'
            const report = createReport({
              data: {createdAt, data, content},
              user,
            })
            console.log({report})

            const added = await addReport(opDdb, {data: report})
            expect(report).toMatchObject(added)
            if (added) {
              const count = await increaseReportAgg(opDdb, {data})
              console.log({count})
              expect(count.reported).toEqual(1)
            }
          })
          it('03. postsByUserReport(User(a)) === 1', async () => {
            const {items} = await postsByUserReport(opDdb, {userId})
            expect(items.length).toEqual(1)
          })
          it('04. User(a)가 Post(0) 신고: 한번더', async () => {
            const content = 'user a, post 0, 2nd report'
            const report = createReport({
              data: {createdAt, data, content},
              user,
            })
            console.log({report})

            const notAdded = await addReport(opDdb, {data: report})
            expect(report).toBeDefined()
            expect(notAdded).not.toBeDefined()
            // 사실 여기에선 조건문 집입을 안할 거라 불필요한 테스트이나, addReport는 항상 increaseReportAgg를 동반해야 하므로 같이 써주는 것
            if (notAdded) { // addReport 짝꿍으로 항상 increaseReportAgg 함수를 실행하는데 add 성공인 경우에만 increase
              const count = await increaseReportAgg(opDdb, {data})
              console.log({count})
              expect(count.reported).toEqual(1)
            }
          })
          it('05. postsByUserReport(User(a)) === 1: 입력 실패로 수 동일', async () => {
            const {items} = await postsByUserReport(opDdb, {userId})
            expect(items.length).toEqual(1)
          })
          it('06. User(a)가 Post(1) 신고', async () => {
            const data = postList[1]
            const content = 'user a, post 1, 1st report'
            const report = createReport({
              data: {createdAt, data, content},
              user,
            })
            console.log({report})

            const added = await addReport(opDdb, {data: report})
            expect(report).toMatchObject(added)
            if (added) {
              const count = await increaseReportAgg(opDdb, {data})
              console.log({count})
              expect(count.reported).toEqual(1)
            }
          })
          it('07. User(b)가 Post(0) 신고', async () => {
            const content = 'user b, post 0, 1st report'
            const report = createReport({
              data: {createdAt, data, content},
              user: member_b,
            })
            console.log({report})
            const added = await addReport(opDdb, {data: report})
            expect(report).toMatchObject(added)
            if (added) {
              const count = await increaseReportAgg(opDdb, {data})
              console.log({count})
              expect(count.reported).toEqual(2)
            }
          })
          it('08. postsByUserReport(User(b)) === 1', async () => {
            const {items} = await postsByUserReport(opDdb, {userId: member_b.id})
            expect(items.length).toEqual(1)
          })
          it('09. postsByUserReport(User(a)) === 2', async () => {
            const {items} = await postsByUserReport(opDdb, {userId})
            console.table(items)
            expect(items.length).toEqual(2)
          })
          it('10. commentsByUserReport(User(a)) === Comment(0): 엔티티 필터', async () => {
            const {items} = await commentsByUserReport(opDdb, {userId})
            expect(items.length).toEqual(0)
          })
          it('11. postsByUserReport(User(a)) === Post(2): 엔티티 필터', async () => {
            const {items} = await postsByUserReport(opDdb, {userId})
            console.table(items)
            expect(items.length).toEqual(2)
          })
          it('12. removeReport(User(a))', async () => {
            const result = await removeReport(opDdb, {data, userId})
            console.log({result})
          })
          it('13. postsByUserReport(User(a)) === Post(1): 엔티티 필터', async () => {
            const {items} = await postsByUserReport(opDdb, {userId})
            expect(items.length).toEqual(1)
          })
        })

        describe('commentsByUserReport', function () {
          const user = member_a
          const userId = member_a.id
          const createdAt = new Date().toISOString()

          let postList: Post[]
          let commentList: Comment[]
          let targetId: string
          let comment: Comment

          beforeAll(() => getInitialData().then(initialData => {
            commentList = initialData.filter(d => d.rk === EEntity.Comment) as Comment[]
            postList = initialData.filter(d => d.rk === EEntity.Post) as Post[]
            [comment] = commentList
            targetId = comment.hk
          }))

          it('01. commentsByUserReport(User(a)) === 0', async () => {
            const {items} = await commentsByUserReport(opDdb, {userId})
            expect(items.length).toEqual(0)
          })
          it('02. User(a)가 Comment(0) 신고', async () => {
            const content = 'user a, comment 0, 1st report'
            const report = createReport({
              data: {createdAt, data: comment, content},
              user,
            })
            console.log({report})
            const added = await addReport(opDdb, {data: report})
            expect(report).toMatchObject(added)
            if (added) {
              const count = await increaseReportAgg(opDdb, {data: report.data})
              console.log({count})
              expect(count.reported).toEqual(1)
            }
          })
          it('03. commentsByUserReport(User(a)) === 1', async () => {
            const {items} = await commentsByUserReport(opDdb, {userId})
            expect(items.length).toEqual(1)
          })
          it('04. User(a)가 Comment(0) 신고: 한번더', async () => {
            const content = 'user a, comment 0, 2nd report'
            const report = createReport({
              data: {createdAt, data: comment, content},
              user,
            })
            console.log({report})
            const notAdded = await addReport(opDdb, {data: report})
            expect(report).toBeDefined()
            expect(notAdded).not.toBeDefined()
            if (notAdded) {
              const count = await increaseReportAgg(opDdb, {data: report.data})
              console.log({count})
              expect(count.reported).toEqual(1)
            }
          })
          it('05. commentsByUserReport(User(a)) === 1: 입력 실패로 수 동일', async () => {
            const {items} = await commentsByUserReport(opDdb, {userId})
            console.table(items)
            expect(items.length).toEqual(1)
          })
          it('06. User(a)가 Comment(1) 신고', async () => {
            const data = commentList[1]
            const content = 'user a, comment 1, 1st report'
            const report = createReport({
              data: {createdAt, data, content},
              user,
            })
            console.log({report})
            const added = await addReport(opDdb, {data: report})
            expect(report).toMatchObject(added)
            if (added) {
              const count = await increaseReportAgg(opDdb, {data: report.data})
              console.log({count})
              expect(count.reported).toEqual(1)
            }
          })
          it('07. User(b)가 Comment(0) 신고', async () => {
            const content = 'user b, comment 0, 1st report'
            const report = createReport({
              data: {createdAt, data: comment, content},
              user: member_b,
            })
            console.log({report})
            const added = await addReport(opDdb, {data: report})
            expect(report).toMatchObject(added)
            if (added) {
              const count = await increaseReportAgg(opDdb, {data: report.data})
              console.log({count})
              expect(count.reported).toEqual(2)
            }
          })
          it('08. commentsByUserReport(User(b)) === 1', async () => {
            const {items} = await commentsByUserReport(opDdb, {userId: member_b.id})
            expect(items.length).toEqual(1)
          })
          it('09. commentsByUserReport(User(a)) === 2', async () => {
            const {items} = await commentsByUserReport(opDdb, {userId})
            console.table(items)
            expect(items.length).toEqual(2)
          })
          it('10. postsByUserReport(User(a)) === Post(0): 엔티티 필터', async () => {
            const {items} = await postsByUserReport(opDdb, {userId})
            expect(items.length).toEqual(0)
          })
          it('11. commentsByUserReport(User(a)) === Comment(2): 엔티티 필터', async () => {
            const {items} = await commentsByUserReport(opDdb, {userId})
            expect(items.length).toEqual(2)
          })
        })
      })
    })
  })
})
