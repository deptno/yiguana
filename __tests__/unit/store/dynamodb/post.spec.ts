import {createPost, Post} from '../../../../src/entity/post'
import {getPosts} from '../../../../src/store/dynamodb/get-posts'
import {opDdb, opS3} from '../../../env'
import {getPostsByUserId} from '../../../../src/store/dynamodb/get-posts-by-user-id'
import {getInitialData} from '../../../setup'
import {removePost} from '../../../../src/store/dynamodb/remove-post'
import {member_a, member_b, member_c, member_d, member_e} from '../../../__data__/user'
import {createPostContentUnSafe} from '../../../../src/store/s3/create-post-content'
import {createLike} from '../../../../src/entity/like'
import {addLike} from '../../../../src/store/dynamodb/add-like'
import {EEntity, EEntityStatus} from '../../../../src/type'
import {put} from '../../../../src/store/dynamodb/raw/put'
import {update} from '../../../../src/store/dynamodb/raw/update'
import {incViews} from '../../../../src/store/dynamodb/inc-views'
import {incLikes} from '../../../../src/store/dynamodb/inc-likes'
import {getPostsByUserLike} from '../../../../src/store/dynamodb/get-posts-by-user-like'

describe('unit', function () {
  describe('store', function () {
    describe('dynamodb', function () {
      describe('post', function () {

        let postList: Post[]

        beforeEach(async () =>
          getInitialData().then(data => postList = data.filter(d => d.rk === EEntity.Post) as Post[]),
        )

        describe('posts', function () {
          it.todo('시간순 리스트, 우선순위 글에 대한 테스트')
          it('시간순 리스트', async () => {
            const {items} = await getPosts(opDdb, {})
            console.debug('시간순 리스트')
            console.table(items)

            items
              .map(p => p.createdAt)
              .reduce((prev, curr) => {
                expect(new Date(prev).getTime()).toBeGreaterThan(new Date(curr).getTime())
                return curr
              })
          })

          describe('addPost', function () {
            it('시간순 리스트', async () => {
              const latestPost = createPost({
                data: await createPostContentUnSafe(opS3, {
                  category: 'news#politics',
                  title: 'latest',
                  content: 'content',
                }),
                user: member_a,
              })
              await put(opDdb, latestPost)
              const {items} = await getPosts(opDdb, {})
              console.debug('시간순 리스트')
              console.table(items)

              expect(items.length).toBeGreaterThan(postList.length)
              items
                .map(p => p.createdAt)
                .reduce((prev, curr) => {
                  expect(new Date(prev).getTime()).toBeGreaterThan(new Date(curr).getTime())
                  return curr
                })
            })
          })

          describe('removePost', () => {
            // GSI 를 제거하지 않고 삭제된 포스트로 표시함
            xit('포스트 삭제, 삭제 플래그만 표기 후 GSI 키를 제거한다.', async () => {
              // 실제로는 삭제 플래그만 가동
              const {items: before} = await getPosts(opDdb, {})
              const removedPost = await removePost(opDdb, {hk: before[0].hk, user: before[0].user})

              expect(removedPost).toBeDefined()
              expect(removedPost.hk).toEqual(before[0].hk)

              const {items: after} = await getPosts(opDdb, {})

              expect(after.length).toEqual(before.length)

              const {items} = await opDdb.dynamodb.scan<any>({
                TableName: opDdb.tableName,
              })

              expect(items.filter(t => t.rk === EEntity.Post).length).toEqual(before.length)
              expect(items.filter(t => t.rk === EEntity.Post).length).toEqual(after.length + 1)

            })
          })

          describe('updatePost', function () {
            it('updatePost', async () => {
              // TODO: update 는 기본적으로 포스트(s3에 저장)에 대해서 만 적용되며 메타데이터는 변경이 없다
              // TODO: updatedAt 이 필요한지 생각해 볼 필요가 있고 이 데이터 자체는 s3 데이터가 가지고 있을 수 있다
              // TODO: 이 경우라면 updatePost 는 필요하지 않다
              const [post] = postList
              const updatedPost = await update<Post>(opDdb, {
                ...post,
                updatedAt: new Date().toISOString(),
              })
              console.table([post, updatedPost])
            })
            it('likePost', async () => {
              const {items: before} = await getPosts(opDdb, {})
              const like = createLike({
                data: {
                  data: before[0],
                  createdAt: new Date().toISOString(),
                },
                user: member_e,
              })
              const saved = await addLike(opDdb, like)
              console.log({saved})

              const likedPost = await incLikes(opDdb, before[0])
              expect(likedPost.hk).toEqual(before[0].hk)
              expect(likedPost.likes).toEqual(before[0].likes + 1)

              const {items: after} = await getPosts(opDdb, {})
              expect(after[0].likes).toEqual(before[0].likes + 1)
              console.debug('result')
              console.table(after)
            })
            it('viewPost', async () => {
              const {items: before} = await getPosts(opDdb, {})
              const isViewed = await incViews(opDdb, before[0])
              console.log(isViewed)

              const {items: after} = await getPosts(opDdb, {})
              expect(after[0].views).toEqual(before[0].views + 1)
              console.debug('result')
              console.table(after)
            })
          })
        })

        describe('postByUserId', function () {
          it('유저 리스트 aGun', async () => {
            const {items} = await getPostsByUserId(opDdb, {userId: member_a.id})
            console.debug('유저 리스트 aGun')
            console.table(items)

            expect(items).toHaveLength(2)
            expect(
              items
                .map(p => p.userId)
                .every(u => u === member_a.id),
            ).toBeTruthy()
          })
          it('유저 리스트 bGun', async () => {
            const {items} = await getPostsByUserId(opDdb, {userId: member_b.id})
            console.debug('유저 리스트 bGun')
            console.table(items)

            expect(
              items
                .map(p => p.userId)
                .every(u => u === member_b.id),
            ).toBeTruthy()
          })
          it('유저 리스트 cGun, 카테고리 kids', async () => {
            const {items} = await getPostsByUserId(opDdb, {userId: member_c.id, category: 'kids'})
            console.debug('유저 리스트 cGun, 카테고리 kids')
            console.table(items)

            expect(
              items
                .map(p => p.userId)
                .every(u => u === member_c.id),
            ).toBeTruthy()
            expect(
              items
                .map(p => p.category)
                .every(c => c.startsWith('kids')),
            ).toBeTruthy()
          })

          describe('addPost', function () {
            it('유저 리스트 cGun, 카테고리 kids, 포스트 추가, 삭제 후 조회, 글 수 확인', async () => {
              const {items: before} = await getPostsByUserId(opDdb, {userId: member_c.id, category: 'kids'})
              const beforeItemCount = before.length

              console.log('before')
              console.table(before)
              {
                await put<Post>(opDdb, createPost({
                  data: await createPostContentUnSafe(opS3, {
                    category: 'news#anime',
                    title: 'latest',
                    content: 'out of kids',
                  }),
                  user: member_c,
                }))
                const {items} = await getPostsByUserId(opDdb, {userId: member_c.id, category: 'kids'})
                expect(items).toHaveLength(beforeItemCount)
                console.table(items)
              }

              await put<Post>(opDdb, createPost({
                data: await createPostContentUnSafe(opS3, {
                  category: 'kids#anime',
                  title: 'latest',
                  content: 'content',
                }),
                user: member_c,
              }))

              const {items} = await getPostsByUserId(opDdb, {userId: member_c.id, category: 'kids'})
              console.debug('유저 리스트 cGun, 카테고리 kids')
              console.table(items)

              expect(
                items
                  .map(p => p.userId)
                  .every(u => u === member_c.id),
              ).toEqual(true)
              expect(
                items
                  .map(p => p.category)
                  .every(c => c.startsWith('kids')),
              ).toEqual(true)
              expect(items.length > beforeItemCount).toEqual(true)
            })
          })

          describe('removePost', () => {
            // cGun 데이터만 추가/삭제하였으니 cGun 데이터는 잘 갱신되고 aGun 데이터는 무결함을 확인하는 테스트
            it('유저 리스트 cGun -> 포스트 추가 -> 포스트 삭제 -> 유저 리스트 aGun', async () => {
              const {items: before} = await getPostsByUserId(opDdb, {userId: member_c.id})
              console.debug('유저 리스트 cGun')

              const {items: other} = await getPostsByUserId(opDdb, {userId: member_a.id})
              console.debug('다른 유저 리스트 aGun')
              console.table(other)

              console.debug('포스트 추가')
              await put<Post>(opDdb, createPost(
                {
                  data: await createPostContentUnSafe(opS3, {
                    category: 'kids#anime',
                    title: 'latest',
                    content: 'content',
                  }),
                  user: member_c,
                },
              ))
              console.log('포스트 삭제')
              const removedPost = await removePost(opDdb, {hk: before[0].hk, user: before[0].user})
              expect(removedPost).toBeDefined()
              expect(removedPost.hk).toEqual(before[0].hk)

              const {items: after} = await getPostsByUserId(opDdb, {userId: member_c.id})
              console.table(after)
              expect(
                after
                  .filter(t => t.rk === EEntity.Post)
                  .filter(t => t.status !== EEntityStatus.deletedByUser)
                  .length,
              ).toEqual(before.length)
              expect(
                after
                  .filter(t => t.status === EEntityStatus.deletedByUser).length,
              ).toEqual(1)

              console.log('다른 유저 리스트 aGun')
              const {items} = await getPostsByUserId(opDdb, {userId: member_a.id})
              console.table(items)
              expect(items.length).toEqual(other.length)
            })

            describe('updatePost', function () {
              it.todo('updatePost')
              it('유저 dGun likePost -> postsByUserLike', async () => {
                const {items: beforeUserLike} = await getPostsByUserLike(opDdb, {userId: member_d.id})
                expect(beforeUserLike.length).toEqual(0)

                const {items: before} = await getPosts(opDdb, {})
                const like = createLike({
                  data: {
                    data: before[0],
                    createdAt: new Date().toISOString()
                  },
                  user: member_d
                })
                const saved = await addLike(opDdb, like)
                console.log({saved})

                const likedPost = await incLikes(opDdb, before[0])
                expect(likedPost.hk).toEqual(before[0].hk)
                expect(likedPost.likes).toEqual(before[0].likes + 1)

                const {items: afterUserLike} = await getPostsByUserLike(opDdb, {userId: member_d.id})
                expect(afterUserLike.length).toEqual(beforeUserLike.length + 1)
              })
            })
          })
        })
      })
    })
  })
})
