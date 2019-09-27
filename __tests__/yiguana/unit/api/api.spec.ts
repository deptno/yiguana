import {createApi} from '../../../../packages/yiguana'
import {DynamoDB, S3} from 'aws-sdk'
import {createDynamoDB} from '@deptno/dynamodb'
import {createS3} from '@deptno/s3'
import {YiguanaPost} from '../../../../packages/yiguana/entity'
import {gamePost, muckbangPost, musicPost} from '../../../data/post'
import * as R from 'ramda'

describe('레거시', function () {
  const dynamodb = createDynamoDB(new DynamoDB.DocumentClient())
  const s3 = createS3(new S3())
  const board = 'ent'
  const api = createApi({
    bucketName: '',
    tableName: 'yiguana',
    dynamodb,
    s3,
  })
  beforeAll(async done => {
    const {items} = await api.posts({board})
    expect(items).toHaveLength(0)
    const posts = [
      muckbangPost,
      gamePost,
      musicPost,
    ]
    const postDocs = await Promise.all(posts.map(post => api.addPost({post})))
    console.table(postDocs)
    done()
  })
  afterAll(async done => {
    done()
  })

  it('get', done => {
    api
      .posts({board: 'ent'})
      .then(res => {
        console.table(res.items)
        console.log(R.omit(['items'], res))
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
