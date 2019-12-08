import {getComments} from '../../src/store/dynamodb/get-comments'
import {opDdb} from '../env'
import {getInitialData} from '../setup'
import {Post} from '../../src/entity/post'
import {uiComment} from '../ui'
import {EEntity} from '../../src/type'

describe('bdd', function () {
  describe('post', function () {

    let postList: Post[]

    beforeEach(() =>
      getInitialData().then(data => postList = data.filter(d => d.rk === EEntity.Post) as Post[]),
    )
    it.todo('보기')
    it.todo('좋아요 누르기')
    it.todo('수정하기')
    it.todo('삭제하기')
    it.todo('신고하기')
    it('댓글 조회하기', async function () {
      const {items} = await getComments(opDdb, {
        postId: postList[0].hk,
      })
      const uiItems = items.map(uiComment)
      console.table(uiItems)
    })

  })
})
