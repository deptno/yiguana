import {Post} from '../../src/entity/post'
import {posts} from '../../src/api/dynamodb/posts'
import {addPost} from '../../src/api/dynamodb/add-post'
import {createDynamoDB} from '@deptno/dynamodb'
import {bucketName, ddbClient, s3Client, tableName} from '../env'
import {createStore} from '../../src'
import {createEntityFactory} from '../../src/entity'

describe('posts', function () {
  const dynamodb = createDynamoDB(ddbClient)
  const opDynamodb = {dynamodb, tableName: 'yiguana'}
  const store = createStore({
    dynamodb,
    tableName
  })
  const entityFactory = createEntityFactory({
    s3Client,
    bucketName
  })

  it('{보드, 카테고리?} 로 {포스트} 리스트 [시간순] 으로 가져오기', function () {
    let postList: Post[]
    beforeAll(async done => {
      const postContentNews = await entityFactory.createPostContent({
        category: 'news#politics',
        title: 'title',
        content: 'content',
      })
      const postContentKids = await entityFactory.createPostContent({
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
        entityFactory.createPost({data: postContentNews, user: {userId: 'aGun', ip: '0.0.0.0'}}),
        entityFactory.createPost({data: postContentNews, user: {userId: 'bGun', ip: '0.0.0.0'}}),
        entityFactory.createPost({data: postContentNews, user: {userId: 'cGun', ip: '0.0.0.0'}}),
        entityFactory.createPost({data: postContentNews}),
        entityFactory.createPost({data: postContentNews, user: {userId: 'aGun', ip: '0.0.0.0'}}),
        entityFactory.createPost({data: postContentKids, user: {userId: 'cGun', ip: '0.0.0.0'}}),
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
  })
  it('{보드, 카테고리?} 로 특정 {유저}의 {포스트} 리스트  [시간순] 으로 가져오기', function () {

  })
})
