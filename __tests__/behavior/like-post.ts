import {TestGlobal} from '../global'
import * as Board from '../../packages/yiguana/entity/board'

export function likePost<T extends TestGlobal>(shared: T) {
  return async done => {
    const {board, docPost: post} = shared
    shared.docPost = await Board.like({
      board, post
    })
    done()
  }
}
