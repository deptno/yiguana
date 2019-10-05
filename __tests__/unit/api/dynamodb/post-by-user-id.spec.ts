import {Post} from '../../../../src/entity/post'
import {clearData, getInitialData} from '../../../setup'

describe('api', function () {
  let postList: Post[]
  beforeEach(async done => {
    postList = await getInitialData()
    done()
  })

  it('postByUserId', async function () {
  })
})
