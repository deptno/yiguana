import {TestGlobal} from '../scenario'
import * as Board from '../../packages/yiguana/entity/board'

export function viewPost<T extends TestGlobal>(shared: T) {
  return async done => {
    const {board, docPost: post} = shared
    shared.docPost = await Board.view({
      board, post
    })
    done()
  }
}
