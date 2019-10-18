import {Post} from '../../../../src/entity/post'
import {getInitialData} from '../../../setup'
import {EEntity} from '../../../../src/entity/enum'

describe('api', function () {
  let postList: Post[]

  beforeEach(() => getInitialData().then(data => postList = data.filter(d => d.rk === EEntity.Post) as Post[]))

  describe('replies', function () {
    it.todo('replies')
  })
})
