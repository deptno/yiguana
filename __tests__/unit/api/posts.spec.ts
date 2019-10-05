import {createPost, Post} from '../../../src/entity/post'
import {createPostContentUnSafe} from '../../../src/entity/post/post-content'
import {posts} from '../../../src/api/dynamodb/posts'
import {addPost} from '../../../src/api/dynamodb/add-post'
import {opDdb, opS3} from '../../env'
import {postsByUserId} from '../../../src/api/dynamodb/post-by-user-id'
import {clearData, getInitialData} from '../../setup'

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
    describe(', 포스트 추가시', function () {
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
  })
})
