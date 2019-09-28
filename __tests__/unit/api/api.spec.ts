import {createApi} from '../../../../packages'
import {DynamoDB, S3} from 'aws-sdk'
import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {YiguanaPost} from '../../../../packages/entity/dynamodb'
import {gamePost, muckbangPost, musicPost} from '../../../data/post'
import * as R from 'ramda'

describe('레거시', function () {
  const dynamodb = createDynamoDB(new DynamoDB.DocumentClient())
  const s3 = createS3(new S3())
  const api = createApi({
    bucketName: '',
    tableName: 'yiguana',
    dynamodb,
    s3,
  })
  const category = 'ent'
  beforeAll(async done => {
    const {items} = await api.posts({category})
    expect(items).toHaveLength(0)
    const posts = [
      muckbangPost,
      gamePost,
      musicPost,
    ]
    // todo contentUrl 을 만들면서 hasImage 에 대한 처리가 필요함
    const postDocs = await Promise.all(posts.map(post => api.addPost({post})))
    console.table(postDocs)
    done()
  })
  afterAll(async done => {
    done()
  })

  it('posts', done => {
    api
      .posts({category})
      .then(res => {
        console.table(res.items)
        console.log(R.omit(['items'], res))
        const [p1, p2, p3] = res.items as YiguanaPost[]
        const {_type, hk, rk, order, ...rest} = p1 as any

        console.log(rest, muckbangPost)
        expect(p1).toHaveProperty('hk')
        expect(p1).toHaveProperty('rk')
        expect(p1['rk']).toEqual('post')
        expect(rest).toEqual(muckbangPost)
//        expect(p2).toContainEqual(gamePost)
//        expect(p3).toContainEqual(muckbangPost)
      })
      .finally(done)
  })
//  it('add, remove, view, like post', async done => {
//    const {items: postDocs} = await api.posts({board})
//
//    await Promise.all(postDocs.map(doc => api.viewPost({post: doc})))
//    await api.likePost({post: postDocs[0]})
//
//    const {items} = await api.posts({board})
//    expect(items).toHaveLength(3)
//
//    console.table(items)
//
//    expect(items.reduce((acc, item) => acc + item.views, 0)).toBe(3)
//    expect(items.reduce((acc, item) => acc + item.likes, 0)).toBe(1)
//
//    done()
//  })
})
