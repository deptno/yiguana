import {TestGlobal} from '../scenario'
import * as Board from '../../packages/yiguana/entity/board'

export function addPostToBoard<T extends TestGlobal>(shared: T) {
  return async (done) => {
    const {board, post} = shared
    shared.docPost = await Board.add({board, post})
    done()
  }
}
