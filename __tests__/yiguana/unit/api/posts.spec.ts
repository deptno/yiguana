import {createApi} from '../../../../packages/yiguana'
import {DynamoDB, S3} from 'aws-sdk'
import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {Post, YiguanaPost} from '../../../../packages/yiguana/entity/dynamodb'
import {gamePost, muckbangPost, musicPost} from '../../../data/post'
import * as R from 'ramda'

describe('api', function () {
  const category = 'ent'
  let api: ReturnType<typeof createApi>
  let posts: Post[]

  beforeAll(async done => {
    const dynamodb = createDynamoDB(new DynamoDB.DocumentClient())
    const s3 = createS3(new S3())

    api = createApi({
      bucketName: '',
      tableName: 'yiguana',
      dynamodb,
      s3,
    })

    const {items} = await api.posts({category})
    expect(items).toHaveLength(0)
    posts = Array(3)
      .fill(0)
      .map<Post>((_, i) => {
        return {
          board: 'ent',
          title: i.toString().padStart(4, '0'),
          contentUrl: 's3://uri',
          category: (100-i).toString(),
          createdAt: new Date().toISOString(),
          ip: '0.0.0.0',
          author: {
            id: 'userId',
            name: 'userName',
            thumbnail: 'https://thumb',
          },
        }
      })
    // todo contentUrl 을 만들면서 hasImage 에 대한 처리가 필요함
    const postDocs = await Promise.all(posts.map(post => api.addPost({post})))
    console.table(postDocs)
    done()
  })
  afterAll(async done => {
    done()
  })

  it('시간순 리스트', done => {
    api
      .posts({category})
      .then(res => {
        console.table(res.items)
        console.log(R.omit(['items'], res))
        const [p1, p2, p3] = res.items as YiguanaPost[]
        const {_type, hk, rk, order, ...rest} = p1 as any

        console.log(rest)
        console.log(posts[0])
        expect(p1).toHaveProperty('hk')
        expect(p1).toHaveProperty('rk')
        expect(p1['rk']).toEqual('post')
        expect(rest).toEqual(posts[0])
//        expect(p2).toContainEqual(gamePost)
//        expect(p3).toContainEqual(muckbangPost)
      })
      .finally(done)
  })
})
