import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {opDdb} from '../../../env'
import {getInitialData} from '../../../setup'
import {member_a, member_b} from '../../../__data__/user'
import {createLike} from '../../../../src/entity/like'
import {addLike} from '../../../../src/store/dynamodb/add-like'
import {postsByUserLike} from '../../../../src/store/dynamodb/posts-by-user-like'
import {commentsByUserLike} from '../../../../src/store/dynamodb/comments-by-user-like'
import {removeLike} from '../../../../src/store/dynamodb/remove-like'
import {EEntity} from '../../../../src/type'

describe('unit', function () {
  describe('store', function () {
    describe('dynamodb', function () {
      describe('like', function () {

        describe('postByUserLike', function () {
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

          it('01. postsByUserLike(User(a)) === 0', async () => {
            const {items} = await postsByUserLike(opDdb, {userId})
            expect(items.length).toEqual(0)
          })
          it('02. User(a)가 Post(0) 에 공감', async () => {
            const like = createLike({
              data: {createdAt, data},
              user,
            })
            const added = await addLike(opDdb, {data: like})
            expect(like).toMatchObject(added)
          })
          it('03. postsByUserLike(User(a)) === 1', async () => {
            const {items} = await postsByUserLike(opDdb, {userId})
            expect(items.length).toEqual(1)
          })
          it('04. User(a)가 Post(0) 에 공감: 한번더', async () => {
            const like = createLike({
              data: {createdAt, data},
              user,
            })
            const notAdded = await addLike(opDdb, {data: like})
            expect(like).toBeDefined()
            expect(notAdded).not.toBeDefined()
          })
          it('05. postsByUserLike(User(a)) === 1: 입력 실패로 수 동일', async () => {
            const {items} = await postsByUserLike(opDdb, {userId})
            expect(items.length).toEqual(1)
          })
          it('06. User(a)가 Post(1) 에 공감', async () => {
            const data = postList[1]
            const like = createLike({
              data: {createdAt, data},
              user,
            })
            const added = await addLike(opDdb, {data: like})
            expect(like).toMatchObject(added)
          })
          it('07. User(b)가 Post(0) 에 공감', async () => {
            const like = createLike({
              data: {createdAt, data},
              user: member_b,
            })
            const added = await addLike(opDdb, {data: like})
            expect(like).toMatchObject(added)
          })
          it('08. postsByUserLike(User(b)) === 1', async () => {
            const {items} = await postsByUserLike(opDdb, {userId: member_b.id})
            expect(items.length).toEqual(1)
          })
          it('09. postsByUserLike(User(a)) === 2', async () => {
            const {items} = await postsByUserLike(opDdb, {userId})
            console.table(items)
            expect(items.length).toEqual(2)
          })
          it('10. commentsByUserLike(User(a)) === Comment(0): 엔티티 필터', async () => {
            const {items} = await commentsByUserLike(opDdb, {userId})
            expect(items.length).toEqual(0)
          })
          it('11. postsByUserLike(User(a)) === Post(2): 엔티티 필터', async () => {
            const {items} = await postsByUserLike(opDdb, {userId})
            console.table(items)
            expect(items.length).toEqual(2)
          })
          it('12. removeLike(User(a))', async () => {
            const result = await removeLike(opDdb, {data, userId})
            console.log({result})
          })
          it('13. postsByUserLike(User(a)) === Post(1): 엔티티 필터', async () => {
            const {items} = await postsByUserLike(opDdb, {userId})
            expect(items.length).toEqual(1)
          })
        })

        describe('commentsByUserLike', function () {
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

          it('01. commentsByUserLike(User(a)) === 0', async () => {
            const {items} = await commentsByUserLike(opDdb, {userId})
            expect(items.length).toEqual(0)
          })
          it('02. User(a)가 Comment(0) 에 공감', async () => {
            const like = createLike({
              data: {createdAt, data: comment},
              user,
            })
            const added = await addLike(opDdb, {data: like})
            expect(like).toMatchObject(added)
          })
          it('03. commentsByUserLike(User(a)) === 1', async () => {
            const {items} = await commentsByUserLike(opDdb, {userId})
            expect(items.length).toEqual(1)
          })
          it('04. User(a)가 Comment(0) 에 공감: 한번더', async () => {
            const like = createLike({
              data: {createdAt, data: comment},
              user,
            })
            const notAdded = await addLike(opDdb, {data: like})
            expect(like).toBeDefined()
            expect(notAdded).not.toBeDefined()
          })
          it('05. commentsByUserLike(User(a)) === 1: 입력 실패로 수 동일', async () => {
            const {items} = await commentsByUserLike(opDdb, {userId})
            console.table(items)
            expect(items.length).toEqual(1)
          })
          it('06. User(a)가 Comment(1) 에 공감', async () => {
            const data = commentList[1]
            const like = createLike({
              data: {createdAt, data},
              user,
            })
            const added = await addLike(opDdb, {data: like})
            expect(like).toMatchObject(added)
          })
          it('07. User(b)가 Comment(0) 에 공감', async () => {
            const like = createLike({
              data: {createdAt, data: comment},
              user: member_b,
            })
            const added = await addLike(opDdb, {data: like})
            expect(like).toMatchObject(added)
          })
          it('08. commentsByUserLike(User(b)) === 1', async () => {
            const {items} = await commentsByUserLike(opDdb, {userId: member_b.id})
            expect(items.length).toEqual(1)
          })
          it('09. commentsByUserLike(User(a)) === 2', async () => {
            const {items} = await commentsByUserLike(opDdb, {userId})
            console.table(items)
            expect(items.length).toEqual(2)
          })
          it('10. postsByUserLike(User(a)) === Post(0): 엔티티 필터', async () => {
            const {items} = await postsByUserLike(opDdb, {userId})
            expect(items.length).toEqual(0)
          })
          it('11. commentsByUserLike(User(a)) === Comment(2): 엔티티 필터', async () => {
            const {items} = await commentsByUserLike(opDdb, {userId})
            expect(items.length).toEqual(2)
          })
        })
      })
    })
  })
})
