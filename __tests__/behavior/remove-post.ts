import {TestGlobal} from '../scenario'
import * as Board from '../../packages/yiguana/entity/board'

export function removePost<T extends TestGlobal>(shared: T) {
  return async (done) => {
    const {board, docPost} = shared
    const id = docPost.id
    await Board.remove({board, id})
    done()
  }
}
