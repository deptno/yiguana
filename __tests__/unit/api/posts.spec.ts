import {createPost, Post} from '../../../src/entity/post'
import {createPostContentUnSafe} from '../../../src/entity/post/post-content'
import {posts} from '../../../src/api/dynamodb/posts'
import {addPost} from '../../../src/api/dynamodb/add-post'
import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {ddbClient, s3Client} from '../../env'
import {postsByUserId} from '../../../src/api/dynamodb/post-by-user-id'

const dynamodb = createDynamoDB(ddbClient)
const s3 = createS3(s3Client)
const opDynamodb = {dynamodb, tableName: 'yiguana'}
const opS3 = {s3, bucket: 'bucket'}

describe('api', function () {
  describe('posts', function () {
    let postList: Post[]
    beforeAll(async done => {
      const postContentNews = await createPostContentUnSafe(opS3, {
        category: 'news#politics',
        title: 'title',
        content: 'content',
      })
      const postContentKids = await createPostContentUnSafe(opS3, {
        category: 'kids#politics',
        title: 'title',
        content: 'content',
      })
      expect(postContentNews.id).toBeDefined()
      expect(postContentNews.contentUrl).toBeDefined()
      expect(postContentNews.input).toBeDefined()

      const {items} = await posts(opDynamodb, {category: ''})
      expect(items).toHaveLength(0)

      const setup = (posts: Post[]) => posts
        .map<Post>((post, i) => {
          return {
            ...post,
            hk: i.toString().padStart(4, '0'),
            createdAt: new Date(Date.now() - 864000000 * i).toISOString(),
            category: post.category
              .split('#')
              .slice(0, 2)
              .concat(new Date(Date.now() - 864000000 * i).toISOString())
              .join('#'),
          }
        })


      postList = setup([
        createPost(opS3, {data: postContentNews, user: {userId: 'aGun', ip: '0.0.0.0'}}),
        createPost(opS3, {data: postContentNews, user: {userId: 'bGun', ip: '0.0.0.0'}}),
        createPost(opS3, {data: postContentNews, user: {userId: 'cGun', ip: '0.0.0.0'}}),
        createPost(opS3, {data: postContentNews}),
        createPost(opS3, {data: postContentNews, user: {userId: 'aGun', ip: '0.0.0.0'}}),
        createPost(opS3, {data: postContentKids, user: {userId: 'cGun', ip: '0.0.0.0'}}),
      ])
      // todo contentUrl 을 만들면서 hasImage 에 대한 처리가 필요함
      const postDocs = await Promise.all(
        postList.map(
          post => addPost(opDynamodb, {post}),
        ),
      )

      console.table(postDocs)
      done()
    })

    it('시간순 리스트', async done => {
      const {items} = await posts(opDynamodb, {category: 'news'})
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
      const {items} = await postsByUserId(opDynamodb, {userId: 'aGun'})
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
      const {items} = await postsByUserId(opDynamodb, {userId: 'bGun'})
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
      const {items} = await postsByUserId(opDynamodb, {userId: 'cGun', category: 'kids'})
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
        await addPost(opDynamodb, {post: latestPost})
        const {items} = await posts(opDynamodb, {})
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
      it('유저 리스트 cGun, 카테고리 kids', async done => {
        await addPost(opDynamodb, {
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
        const {items} = await postsByUserId(opDynamodb, {userId: 'cGun', category: 'kids'})
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
        expect(items).toHaveLength(2)
        done()
      })
    })
  })
})
