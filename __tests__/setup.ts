import {bucketName, opDdb, s3Client} from './env'
import {createStore} from '../src'
import {createEntityFactory} from '../src/entity'
import {Post} from '../src/entity/post'
import {posts} from '../src/api/dynamodb/posts'
import {addPost} from '../src/api/dynamodb/add-post'
import * as R from 'ramda'
import {createComment} from '../src/entity/comment'
import {addComment} from '../src/api/dynamodb/add-comment'
import {EPriority} from '../src/entity/enum'
import {commentPost} from '../src/api/dynamodb/comment-post'

export const getInitialData = async () => {
  await clearData()

  const store = createStore(opDdb)
  const entityFactory = createEntityFactory({
    s3Client,
    bucketName,
  })

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

  const {items} = await posts(opDdb, {category: ''})
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

  const postList: Post[] = setup([
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
      post => addPost(opDdb, {post}),
    ),
  )
  expect(postDocs).toEqual(postList)

  const comment = createComment({
    data: {
      postId: postList[0].hk,
      content: 'test data',
      priority: EPriority.Normal,
    },
    user: {
      userId: 'userId',
      ip: '0.0.0.0',
    },
  })
  await addComment(opDdb, {
    data: comment
  })
  await commentPost(opDdb, {
    data: postList[0]
  })
  const initialData = await opDdb.dynamodb.scan({TableName: opDdb.tableName})

  console.table(initialData)
  console.debug('-----------------')

  return postList
}


const clearData = async () => {
  const {dynamodb, tableName} = opDdb
  const {items} = await posts(opDdb, {})

  return dynamodb.batchWrite({
    tableName,
    items: items.map(R.pick(['hk', 'rk'])),
    mode: 'delete',
  })
}
