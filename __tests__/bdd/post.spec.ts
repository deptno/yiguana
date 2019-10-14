import {comments} from '../../src/store/dynamodb/comments'
import {opDdb} from '../env'
import {getInitialData} from '../setup'
import {Post} from '../../src/entity/post'
import {uiComment} from '../ui'
import {EEntity} from '../../src/entity/enum'

describe('BDD post', function () {
  let postList: Post[]

  beforeEach(() =>
    getInitialData().then(data => postList = data.filter(d => d.rk === EEntity.Post) as Post[]),
  )

  it('보기', function () {

  })
  it('좋아요 누르기', function () {

  })
  it('수정하기', function () {

  })
  it('삭제하기', function () {

  })
  it('신고하기', function () { // TODO: 후순위이며 신고 기능도 넣을지 스펙 고민 필요

  })
  it('댓글 조회하기', async function () {
    const {items} = await comments(opDdb, {
      postId: postList[0].hk,
    })
    const uiItems = items.map(uiComment)
    console.table(uiItems)
  })
})
