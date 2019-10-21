import {createPost, Post} from '../../../../src/entity/post'
import {createPostContentUnSafe} from '../../../../src/entity/post/post-content'
import {posts} from '../../../../src/store/dynamodb/posts'
import {addPost} from '../../../../src/store/dynamodb/add-post'
import {opDdb, opS3} from '../../../env'
import {postsByUserId} from '../../../../src/store/dynamodb/posts-by-user-id'
import {getInitialData} from '../../../setup'
import {removePost} from '../../../../src/store/dynamodb/remove-post'
import {likePost} from '../../../../src/store/dynamodb/like-post'
import {viewPost} from '../../../../src/store/dynamodb/view-post'
import {EEntity} from '../../../../src/entity/enum'
import {updatePost} from '../../../../src/store/dynamodb/update-post'

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
            const {items} = await posts(opDdb, {category: 'news'})
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
              const latestPost = createPost(
                opS3,
                {
                  data: await createPostContentUnSafe(opS3, {
                    category: 'news#politics',
                    title: 'latest',
                    content: 'content',
                  }),
                  user: {
                    userId: 'aGun',
                    ip: '0.0.0.0',
                  },
                },
              )
              await addPost(opDdb, {data: latestPost})
              const {items} = await posts(opDdb, {})
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
            it('포스트 삭제, 삭제 플래그만 표기 후 GSI 키를 제거한다.', async () => {
              // 실제로는 삭제 플래그만 가동
              const {items: before} = await posts(opDdb, {})
              const isDeleted = await removePost(opDdb, {hk: before[0].hk})

              expect(isDeleted).toEqual(true)

              const {items: after} = await posts(opDdb, {})

              expect(after.length).toEqual(before.length - 1)

              const items = await opDdb.dynamodb.scan<any>({
                TableName: opDdb.tableName,
              })

              expect(items.filter(t => t.rk === 'post').length).toEqual(before.length)
              expect(items.filter(t => t.rk === 'post').length).toEqual(after.length + 1)

            })
          })

          describe('updatePost', function () {
            it('updatePost', async () => {
              // TODO: update 는 기본적으로 포스트(s3에 저장)에 대해서 만 적용되며 메타데이터는 변경이 없다
              // TODO: updatedAt 이 필요한지 생각해 볼 필요가 있고 이 데이터 자체는 s3 데이터가 가지고 있을 수 있다
              // TODO: 이 경우라면 updatePost 는 필요하지 않다
              const [post] = postList
              const updatedPost = await updatePost(opDdb, {
                data: post,
              })
              console.table([post, updatedPost])
            })

            it('likePost', async () => {
              const {items: before} = await posts(opDdb, {})
              const isLiked = await likePost(opDdb, {data: before[0]})
              console.log(isLiked)

              const {items: after} = await posts(opDdb, {})
              expect(after[0].likes).toEqual(before[0].likes + 1)
              console.debug('result')
              console.table(after)
            })

            it('viewPost', async () => {
              const {items: before} = await posts(opDdb, {})
              const isViewed = await viewPost(opDdb, {data: before[0]})
              console.log(isViewed)

              const {items: after} = await posts(opDdb, {})
              expect(after[0].views).toEqual(before[0].views + 1)
              console.debug('result')
              console.table(after)
            })
          })
        })

        describe('postByUserId', function () {
          it('유저 리스트 aGun', async () => {
            const {items} = await postsByUserId(opDdb, {userId: 'aGun'})
            console.debug('유저 리스트 aGun')
            console.table(items)

            expect(items).toHaveLength(2)
            expect(
              items
                .map(p => p.userId)
                .every(u => u === 'aGun'),
            ).toBeTruthy()
          })
          it('유저 리스트 bGun', async () => {
            const {items} = await postsByUserId(opDdb, {userId: 'bGun'})
            console.debug('유저 리스트 bGun')
            console.table(items)

            expect(
              items
                .map(p => p.userId)
                .every(u => u === 'bGun'),
            ).toBeTruthy()
          })
          it('유저 리스트 cGun, 카테고리 kids', async () => {
            const {items} = await postsByUserId(opDdb, {userId: 'cGun', category: 'kids'})
            console.debug('유저 리스트 cGun, 카테고리 kids')
            console.table(items)

            expect(
              items
                .map(p => p.userId)
                .every(u => u === 'cGun'),
            ).toBeTruthy()
            expect(
              items
                .map(p => p.category)
                .every(c => c.startsWith('kids')),
            ).toBeTruthy()
          })

          describe('addPost', function () {
            it('유저 리스트 cGun, 카테고리 kids, 포스트 추가, 삭제 후 조회, 글 수 확인', async () => {
              const {items: before} = await postsByUserId(opDdb, {userId: 'cGun', category: 'kids'})
              const beforeItemCount = before.length

              {
                await addPost(opDdb, {
                  data: createPost(
                    opS3,
                    {
                      data: await createPostContentUnSafe(opS3, {
                        category: 'news#anime',
                        title: 'latest',
                        content: 'out of kids',
                      }),
                      user: {
                        userId: 'cGun',
                        ip: '0.0.0.0',
                      },
                    },
                  ),
                })
                const {items} = await postsByUserId(opDdb, {userId: 'cGun', category: 'kids'})
                expect(items).toHaveLength(beforeItemCount)
              }

              await addPost(opDdb, {
                data: createPost(
                  opS3,
                  {
                    data: await createPostContentUnSafe(opS3, {
                      category: 'kids#anime',
                      title: 'latest',
                      content: 'content',
                    }),
                    user: {
                      userId: 'cGun',
                      ip: '0.0.0.0',
                    },
                  },
                ),
              })

              const {items} = await postsByUserId(opDdb, {userId: 'cGun', category: 'kids'})
              console.debug('유저 리스트 cGun, 카테고리 kids')
              console.table(items)

              expect(
                items
                  .map(p => p.userId)
                  .every(u => u === 'cGun'),
              ).toBeTruthy()
              expect(
                items
                  .map(p => p.category)
                  .every(c => c.startsWith('kids')),
              ).toBeTruthy()
              expect(items.length).toBeGreaterThan(beforeItemCount)
            })
          })

          describe('removePost', () => {
            // cGun 데이터만 추가/삭제하였으니 cGun 데이터는 잘 갱신되고 aGun 데이터는 무결함을 확인하는 테스트
            it('유저 리스트 cGun -> 포스트 추가 -> 포스트 삭제 -> 유저 리스트 aGun', async () => {
              const {items: before} = await postsByUserId(opDdb, {userId: 'cGun'})
              console.debug('유저 리스트 cGun')
              console.table(before)

              const {items: other} = await postsByUserId(opDdb, {userId: 'aGun'})
              console.debug('다른 유저 리스트 aGun')
              console.table(other)

              console.debug('포스트 추가')
              await addPost(opDdb, {
                data: createPost(
                  opS3,
                  {
                    data: await createPostContentUnSafe(opS3, {
                      category: 'kids#anime',
                      title: 'latest',
                      content: 'content',
                    }),
                    user: {
                      userId: 'cGun',
                      ip: '0.0.0.0',
                    },
                  },
                ),
              })
              console.log('포스트 삭제')
              const isDeleted = await removePost(opDdb, {hk: before[0].hk})
              expect(isDeleted).toEqual(true)

              const {items: after} = await postsByUserId(opDdb, {userId: 'cGun'})
              console.table(after)
              expect(
                after
                  .filter(t => t.rk === 'post')
                  .filter(t => !t.deleted)
                  .length,
              ).toEqual(before.length)
              expect(after.filter(t => t.deleted).length).toEqual(1)

              console.log('다른 유저 리스트 aGun')
              const {items} = await postsByUserId(opDdb, {userId: 'aGun'})
              console.table(items)
              expect(items.length).toEqual(other.length)
            })

            describe('updatePost', function () {
              it.todo('updatePost')
              it.todo('likePost')
              it.todo('viewPost')
            })
          })
        })

      })
    })
  })
})
