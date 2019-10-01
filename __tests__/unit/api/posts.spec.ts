import {createPost, Post} from '../../../src/entity/post'
import {createPostContentUnSafe} from '../../../src/entity/post/post-content'
import {posts} from '../../../src/api/dynamodb/posts'
import {addPost} from '../../../src/api/dynamodb/add-post'
import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {ddbClient, s3Client} from '../../env'

const dynamodb = createDynamoDB(ddbClient)
const s3 = createS3(s3Client)
const opDynamodb = {dynamodb, tableName: 'yiguana'}
const opS3 = {s3, bucket: 'bucket'}

describe('api', function () {
  let postList: Post[]

  beforeAll(async done => {
    const postInput = {
      category: 'news#politics',
      title: 'title',
      content: 'content',
    }
    const postContent = await createPostContentUnSafe(opS3, postInput)
    expect(postContent.id).toBeDefined()
    expect(postContent.contentUrl).toBeDefined()
    expect(postContent.input).toBeDefined()

    const post = createPost(opS3, {
      data: postContent,
    })

    const {items} = await posts(opDynamodb, {category: 'news'})
    expect(items).toHaveLength(0)

    postList = Array(3)
      .fill(post)
      .map<Post>((post, i) => {
        return {
          ...post,
          hk: i.toString().padStart(4, '0'),
        }
      })
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
    expect(items).toHaveLength(3)

    postList.map((p, i) => expect(p).toEqual(postList[i]))

    done()
  })
})
