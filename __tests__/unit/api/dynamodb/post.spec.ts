import {Post} from '../../../../src/entity/post'
import {post} from '../../../../src/api/dynamodb/post'
import {opDdb} from '../../../env'
import {clearData, getInitialData} from '../../../setup'

describe('api', function () {
  let postList: Post[]
  beforeEach(async () => {
    console.log('before')
    postList = await getInitialData()
    console.table(postList)
  })

  it('post', async function () {
    const nextPost = await post(opDdb, {hk: postList[0].hk})
    expect(postList[0]).toEqual(nextPost)
    console.table([postList[0], nextPost])
  })
})
