import {createPost, Post} from '../../../src/entity/dynamodb/post'
import {createPostContentUnSafe} from '../../../src/entity/system/post-content'
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
      title: '뉴스기사',
      content: '기사 내용',
    }
    const postContent = await createPostContentUnSafe(opS3, postInput)
    expect(postContent.id).toBeDefined()
    expect(postContent.contentUrl).toBeDefined()
    expect(postContent.input).toBeDefined()

    const post = createPost(opS3, {
      data: postContent,
    })

    console.log('beforeAll')
    try {
      const result = await ddbClient.scan({TableName: opDynamodb.tableName})
        .promise()
      console.log({result})
    } catch (e) {
      console.error('fail error')
    }
    console.log('beforeAll')
    const {items} = await posts(opDynamodb, {category: 'news'})
    expect(items).toHaveLength(0)
    console.log('beforeAll')
    console.table(items)

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

    console.log('---dynamodb')
    console.table(postDocs)
    console.log('---')
    done()
  })

  it('시간순 리스트', async done => {
    console.log(1)
    const {items} = await posts(opDynamodb, {category: 'news'})
    console.log(2)
    const [p1, p2, p3] = items

    expect(items).toHaveLength(3)
    postList.map((p, i) => expect(p).toEqual(postList[i]))
    done()
  })
})
