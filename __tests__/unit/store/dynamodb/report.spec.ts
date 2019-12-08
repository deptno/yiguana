import {member_a, member_b} from '../../../__data__/user'
import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {getInitialData} from '../../../setup'
import {opDdb} from '../../../env'
import {createReport, Report} from '../../../../src/entity/report'
import {addReport} from '../../../../src/store/dynamodb/add-report'
import {removeReport} from '../../../../src/store/dynamodb/remove-report'
import {incReportAgg} from '../../../../src/store/dynamodb/inc-report-agg'
import {getAggReports} from '../../../../src/store/dynamodb/get-agg-reports'
import {EEntity, EEntityStatus} from '../../../../src/type'
import {getReportsByUser} from '../../../../src/store/dynamodb/get-reports-by-user'
import {replyReports} from '../../../../src/store/dynamodb/report-reply'
import {getPosts} from '../../../../src/store/dynamodb/get-posts'
import {replyAggReport} from '../../../../src/store/dynamodb/reply-agg-report'
import {get} from '../../../../src/store/dynamodb/raw/get'

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

          it('01. reportsByUser(User(a)) === 0', async () => {
            const {items} = await getReportsByUser(opDdb, {userId})
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
              const count = await incReportAgg(opDdb, data)
              console.log({count})
              expect(count.reported).toEqual(1)
            }
          })
          it('031. aggReports() === 1', async () => {
            const {items} = await getAggReports(opDdb, {entity: EEntity.Post})
            expect(items.length).toEqual(1)
          })
          it('03. reportsByUser(User(a)) === 1', async () => {
            const {items} = await getReportsByUser(opDdb, {userId})
            expect(items.length).toEqual(1)
          })
          it('04. User(a)가 Post(0) 신고: 한번더', async () => {
            const content = 'user a, post 0, 2nd aggReport'
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
              const count = await incReportAgg(opDdb, data)
              console.log({count})
              expect(count.reported).toEqual(1)
            }
          })
          it('051. aggReports() === 1: 입력 실패로 수 동일', async () => {
            const {items} = await getAggReports(opDdb, {entity: EEntity.Post})
            expect(items.length).toEqual(1)
          })
          it('05. reportsByUser(User(a)) === 1: 입력 실패로 수 동일', async () => {
            const {items} = await getReportsByUser(opDdb, {userId})
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
              const count = await incReportAgg(opDdb, data)
              console.log({count})
              expect(count.reported).toEqual(1)
            }
          })
          it('07. User(b)가 Post(0) 신고', async () => {
            const content = 'user b, post 0, 1st aggReport'
            const report = createReport({
              data: {createdAt, data, content},
              user: member_b,
            })
            console.log({report})
            const added = await addReport(opDdb, {data: report})
            expect(report).toMatchObject(added)
            if (added) {
              const count = await incReportAgg(opDdb, data)
              console.log({count})
              expect(count.reported).toEqual(2)
            }
          })
          it('08. reportsByUser(User(b)) === 1', async () => {
            const {items} = await getReportsByUser(opDdb, {userId: member_b.id})
            expect(items.length).toEqual(1)
          })
          it('091. aggReports() === 2', async () => {
            const {items} = await getAggReports(opDdb, {entity: EEntity.Post})
            expect(items.length).toEqual(2)
            const [report, report2] = items
            console.log({report})
            expect(report.reported).toEqual(2)
            expect(report2.reported).toEqual(1)
          })
          it('09. reportsByUser(User(a)) === 2', async () => {
            const {items} = await getReportsByUser(opDdb, {userId})
            console.table(items)
            expect(items.length).toEqual(2)
          })
          it('10. reportsByUser(User(a)) === Comment(0): 엔티티 필터', async () => {
            const {items} = await getReportsByUser(opDdb, {
              userId,
              entity: EEntity.Comment
            })
            expect(items.length).toEqual(0)
          })
          it('11. reportsByUser(User(a)) === Post(2): 엔티티 필터', async () => {
            const {items} = await getReportsByUser(opDdb, {
              userId,
              entity: EEntity.Post
            })
            console.table(items)
            expect(items.length).toEqual(2)
          })
          it('12. removeReport(User(a))', async () => {
            const result = await removeReport(opDdb, {data, userId})
            console.log({result})
          })
          it('13. reportsByUser(User(a)) === Post(1): 엔티티 필터', async () => {
            const {items} = await getReportsByUser(opDdb, {
              userId,
              entity: EEntity.Post
            })
            expect(items.length).toEqual(1)
          })
        })

        describe('reportsByUser', function () {
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

          it('01. reportsByUser(User(a)) === 0', async () => {
            const {items} = await getReportsByUser(opDdb, {userId})
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
              const count = await incReportAgg(opDdb, report.data)
              console.log({count})
              expect(count.reported).toEqual(1)
            }
          })
          it('03. reportsByUser(User(a)) === 1', async () => {
            const {items} = await getReportsByUser(opDdb, {userId})
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
              const count = await incReportAgg(opDdb, report.data)
              console.log({count})
              expect(count.reported).toEqual(1)
            }
          })
          it('05. reportsByUser(User(a)) === 1: 입력 실패로 수 동일', async () => {
            const {items} = await getReportsByUser(opDdb, {userId})
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
              const count = await incReportAgg(opDdb, report.data)
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
              const count = await incReportAgg(opDdb, report.data)
              console.log({count})
              expect(count.reported).toEqual(2)
            }
          })
          it('08. reportsByUser(User(b)) === 1', async () => {
            const {items} = await getReportsByUser(opDdb, {userId: member_b.id})
            expect(items.length).toEqual(1)
          })
          it('09. reportsByUser(User(a)) === 2', async () => {
            const {items} = await getReportsByUser(opDdb, {userId})
            console.table(items)
            expect(items.length).toEqual(2)
          })
          it('10. reportsByUser(User(a)) === Post(0): 엔티티 필터', async () => {
            const {items} = await getReportsByUser(opDdb, {
              userId,
              entity: EEntity.Post
            })
            expect(items.length).toEqual(0)
          })
          it('11. reportsByUser(User(a)) === Comment(2): 엔티티 필터', async () => {
            const {items} = await getReportsByUser(opDdb, {
              userId,
              entity: EEntity.Comment
            })
            expect(items.length).toEqual(2)
          })
        })

        describe('report admin', function() {
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

          it('01. reportsByUser(User(a)) === 0', async () => {
            const {items} = await getReportsByUser(opDdb, {userId})
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
              const count = await incReportAgg(opDdb, data)
              console.log({count})
              expect(count.reported).toEqual(1)
            }
          })
          it('031. aggReports() === 1', async () => {
            const {items} = await getAggReports(opDdb, {entity: EEntity.Post})
            console.table(items)
            expect(items.length).toEqual(1)
            expect(items[0].processed).toBeUndefined()
          })
          it('03. reportsByUser(User(a)) === 1', async () => {
            const {items} = await getReportsByUser(opDdb, {userId})
            expect(items.length).toEqual(1)
          })
          it('04. replyReport', async () => {
            await replyAggReport(opDdb, {
              data: {
                hk: targetId
              },
              entity: EEntity.Post,
              answer: 'test answer',
              status: EEntityStatus.innocent,
            })
            await replyReports(opDdb, {
              data: {
                hk: targetId,
                rk: EEntity.Post,
              },
              answer: 'test answer',
              status: EEntityStatus.innocent,
            })

            const {items} = await getPosts(opDdb, {})
            expect(
              items.filter(i => i.status === EEntityStatus.innocent).length,
            ).toEqual(1)
            const item = await get<Report>(opDdb, {hk: targetId, rk: EEntity.Post})
            expect(item.status === EEntityStatus.innocent)
          })
          it('05. aggReports() === 1', async () => {
            const {items} = await getAggReports(opDdb, {entity: EEntity.Post, end: true})
            console.table(items)
            expect(items.length).toEqual(1)
            expect(items[0].processed).toEqual(items[0].reported)
          })
        })
      })
    })
  })
})
