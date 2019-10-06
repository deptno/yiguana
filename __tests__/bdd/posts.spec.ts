import {Post} from '../../src/entity/post'
import {posts} from '../../src/api/dynamodb/posts'
import {getInitialData} from '../setup'

describe('posts', function () {
  let postList: Post[]
  beforeEach(async () => {
    postList = await getInitialData()
  })
  it('{보드, 카테고리?} 로 {포스트} 리스트 [시간순] 으로 가져오기', function () {

  })
  it('{보드, 카테고리?} 로 특정 {유저}의 {포스트} 리스트  [시간순] 으로 가져오기', function () {

  })
})
