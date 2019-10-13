import {createPost, Post} from '../../../src/entity/post'
import {createPostContentUnSafe} from '../../../src/entity/post/post-content'
import {posts} from '../../../src/api/dynamodb/posts'
import {addPost} from '../../../src/api/dynamodb/add-post'
import {opDdb, opS3} from '../../env'
import {postsByUserId} from '../../../src/api/dynamodb/post-by-user-id'
import {getInitialData} from '../../setup'
import {removePost} from '../../../src/api/dynamodb/remove-post'

describe('api', function () {
  let postList: Post[]

  beforeEach(async done => {
    postList = await getInitialData()
    done()
  })

  describe('posts', function () {
    it('시간순 리스트', async done => {
      const {items} = await posts(opDdb, {category: 'news'})
      console.debug('시간순 리스트')
      console.table(items)

      expect(items).toHaveLength(5)
      items.map((p, i) => expect(p).toEqual(postList[i]))
      items
        .map(p => p.createdAt)
        .reduce((prev, curr) => {
          expect(new Date(prev).getTime()).toBeGreaterThan(new Date(curr).getTime())
          return curr
        })
      done()
    })

    describe('addPost', function () {
      it('시간순 리스트', async done => {
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
        await addPost(opDdb, {post: latestPost})
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
        done()
      })
    })

    describe('removePost', () => {
      it('포스트 삭제, 삭제 플래그만 표기 후 GSI 키를 제거한다.', async () => {
        // 실제로는 삭제 플래그만 가동
        const {items: before} = await posts(opDdb, {})
        const isDeleted = await removePost(opDdb, {id: before[0].hk})

        expect(isDeleted).toEqual(true)

        const {items: after} = await posts(opDdb, {})

        expect(after.length).toEqual(before.length - 1)

        const items = await opDdb.dynamodb.scan<any>({
          TableName: opDdb.tableName
        })

        expect(items.filter(t => t.rk === 'post').length).toEqual(before.length)
        expect(items.filter(t => t.rk === 'post').length).toEqual(after.length + 1)

      })
    })

    describe('updatePost', function () {
      it('updatePost', async () => {
        expect(true).toEqual(false)
      })
      it('likePost', async () => {
        expect(true).toEqual(false)
      })
      it('viewPost', async () => {
        expect(true).toEqual(false)
      })
    })
  })

  describe('postByUserId', function () {
    it('유저 리스트 aGun', async done => {
      const {items} = await postsByUserId(opDdb, {userId: 'aGun'})
      console.debug('유저 리스트 aGun')
      console.table(items)

      expect(items).toHaveLength(2)
      expect(
        items
          .map(p => p.userId)
          .every(u => u === 'aGun'),
      ).toBeTruthy()
      done()
    })
    it('유저 리스트 bGun', async done => {
      const {items} = await postsByUserId(opDdb, {userId: 'bGun'})
      console.debug('유저 리스트 bGun')
      console.table(items)

      expect(
        items
          .map(p => p.userId)
          .every(u => u === 'bGun'),
      ).toBeTruthy()
      done()
    })
    it('유저 리스트 cGun, 카테고리 kids', async done => {
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
      done()
    })

    describe('addPost', function () {
      it('유저 리스트 cGun, 카테고리 kids, 포스트 추가, 삭제 후 조회, 글 수 확인', async done => {
        const {items: before} = await postsByUserId(opDdb, {userId: 'cGun', category: 'kids'})
        const beforeItemCount = before.length

        {
          await addPost(opDdb, {
            post: createPost(
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
          post: createPost(
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
        done()
      })
    })

    describe('removePost', () => {
    })

    describe('updatePost', function () {
      it('updatePost', async () => {
        expect(true).toEqual(false)
      })
      it('likePost', async () => {
        expect(true).toEqual(false)
      })
      it('viewPost', async () => {
        expect(true).toEqual(false)
      })
    })
  })
})
