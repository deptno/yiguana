import {Post} from '../../../../src/entity/post'
import {Comment} from '../../../../src/entity/comment'
import {opDdb} from '../../../env'
import {getInitialData} from '../../../setup'
import {EEntity} from '../../../../src/entity/enum'
import {member_a, member_b} from '../../../__data__/user'
import {createLike} from '../../../../src/entity/like'
import {addLike} from '../../../../src/store/dynamodb/add-like'
import {postsByUserLike} from '../../../../src/store/dynamodb/posts-by-user-like'
import {commentsByUserLike} from '../../../../src/store/dynamodb/comments-by-user-like'

describe('unit', function () {
  describe('store', function () {
    describe('dynamodb', function () {
      describe('like', function () {
        describe('postByUserLike', function () {

          describe('Post', function () {
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

            it('postsByUserLike(User(a)) === 0', async () => {
              const {items} = await postsByUserLike(opDdb, {userId})
              expect(items.length).toEqual(0)
            })
            it('User(a)가 Post(0) 에 공감', async () => {
              const like = createLike({
                data: {createdAt, data},
                user,
              })
              const added = await addLike(opDdb, {data: like})
              expect(like).toMatchObject(added)
            })
            it('postsByUserLike(User(a)) === 1', async () => {
              const {items} = await postsByUserLike(opDdb, {userId})
              expect(items.length).toEqual(1)
            })
            it('User(a)가 Post(0) 에 공감: 한번더', async () => {
              const like = createLike({
                data: {createdAt, data},
                user,
              })
              const notAdded = await addLike(opDdb, {data: like})
              expect(like).toBeDefined()
              expect(notAdded).not.toBeDefined()
            })
            it('postsByUserLike(User(a)) === 1: 입력 실패로 수 동일', async () => {
              const {items} = await postsByUserLike(opDdb, {userId})
              expect(items.length).toEqual(1)
            })
            it('User(a)가 Post(1) 에 공감', async () => {
              const data = postList[1]
              const like = createLike({
                data: {createdAt, data},
                user,
              })
              const added = await addLike(opDdb, {data: like})
              expect(like).toMatchObject(added)
            })
            it('User(b)가 Post(0) 에 공감', async () => {
              const like = createLike({
                data: {createdAt, data},
                user: member_b,
              })
              const added = await addLike(opDdb, {data: like})
              expect(like).toMatchObject(added)
            })
            it('postsByUserLike(User(b)) === 1', async () => {
              const {items} = await postsByUserLike(opDdb, {userId: member_b.id})
              expect(items.length).toEqual(1)
            })
            it('postsByUserLike(User(a)) === 2', async () => {
              const {items} = await postsByUserLike(opDdb, {userId})
              console.table(items)
              expect(items.length).toEqual(2)
            })
            it('postsByUserLike(User(a)) === Comment(0): 엔티티 필터', async () => {
              const {items} = await commentsByUserLike(opDdb, {userId})
              expect(items.length).toEqual(0)
            })
            it('postsByUserLike(User(a)) === Post(2): 엔티티 필터', async () => {
              const {items} = await postsByUserLike(opDdb, {userId})
              console.table(items)
              expect(items.length).toEqual(2)
            })
          })

        })
      })
    })
  })
})
