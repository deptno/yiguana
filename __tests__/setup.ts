import {opDdb, opS3} from './env'
import {Comment, EntityFactory, Post} from '../src/entity'
import * as R from 'ramda'
import {createComment} from '../src/entity/comment'
import {commentPost} from '../src/store/dynamodb/comment-post'
import {YiguanaDocument} from '../src/type'
import {ContentStore} from '../src/store/s3'
import {member_a, member_b, member_c, member_d, member_f, non_member_a} from './__data__/user'
import {getPosts} from '../src/store/dynamodb/get-posts'
import {put} from '../src/store/dynamodb/raw/put'

export const getInitialData = async () => {
  await clearData()

  const ef = new EntityFactory()
  const cs = new ContentStore(opS3, {contentLengthRange: {min: 2**7, max: 2**20}})
  const postContentNews = await cs.create({
    category: 'news#politics',
    title: 'title',
    content: 'content',
  })
  const postContentKids = await cs.create({
    category: 'kids#politics',
    title: 'title',
    content: 'content',
  })
  expect(postContentNews.id).toBeDefined()
  expect(postContentNews.contentUrl).toBeDefined()
  expect(postContentNews.input).toBeDefined()

  const {items} = await getPosts(opDdb, {})
  expect(items).toHaveLength(0)

  const setup = (posts: Post[]) => posts
    .map<Post>((post, i) => {
      let createdAt = new Date(Date.now() - 864000000 * i).toISOString()
      return {
        ...post,
        hk: i.toString().padStart(4, '0'),
        createdAt,
        category: post.category
          .split('#')
          .slice(0, 2)
          .concat(createdAt)
          .join('#'),
        posts: createdAt
      }
    })

  const postList: Post[] = setup([
    ef.createPost({data: postContentNews, user: member_a}),
    ef.createPost({data: postContentNews, user: member_b}),
    ef.createPost({data: postContentNews, user: member_c}),
    ef.createPost({data: postContentNews, user: non_member_a}),
    ef.createPost({data: postContentNews, user: member_a}),
    ef.createPost({data: postContentKids, user: member_c}),
  ])
// todo contentUrl 을 만들면서 hasImage 에 대한 처리가 필요함
  const postDocs = await Promise.all(
    postList.map(
      post => put<Post>(opDdb, post),
    ),
  )
  expect(postDocs).toEqual(postList)

  const commentByUserD = createComment({
    data: {
      postId: postList[0].hk,
      content: 'test data, post 0, user d',
      createdAt: new Date().toISOString()
    },
    user: member_d,
  })
  await put<Comment>(opDdb, commentByUserD)
  await commentPost(opDdb, {
    data: postList[0],
  })
  const commentByUserF = createComment({
    data: {
      postId: postList[1].hk,
      content: 'test data, post 1, user e',
      createdAt: new Date().toISOString()
    },
    user: member_f,
  })
  await put<Comment>(opDdb, commentByUserF)
  await commentPost(opDdb, {
    data: postList[1],
  })
  const initialData = await opDdb.dynamodb.scan<YiguanaDocument>({TableName: opDdb.tableName})

  console.debug('--- test data set')
  console.table(initialData)

  return initialData.items
}


export const clearData = async () => {
  const {dynamodb, tableName} = opDdb
  const {items} = await dynamodb.scan({TableName: tableName})

  return dynamodb.batchWrite({
    tableName,
    items: items.map(R.pick(['hk', 'rk'])),
    mode: 'delete',
  })
}
