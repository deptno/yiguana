import {Post} from '../../src/entity/post'
import {getInitialData} from '../setup'
import {EEntity} from '../../src/type'

describe('bdd', function () {
  describe('posts', function () {

    let postList: Post[]

    beforeEach(() =>
      getInitialData().then(data => postList = data.filter(d => d.rk === EEntity.Post) as Post[]),
    )

    it.todo('{보드, 카테고리?} 로 {포스트} 리스트 [시간순] 으로 가져오기')
    it.todo('{보드, 카테고리?} 로 특정 {유저}의 {포스트} 리스트  [시간순] 으로 가져오기')

  })
})
