import {TestGlobal} from '../global'
import * as Board from '../../packages/yiguana/entity/board'

export function removePost<T extends TestGlobal>(shared: T) {
  return async (done) => {
    const {board, docPost} = shared
    const id = docPost.id
    await Board.remove({board, id})
    done()
  }
}

export function removePosts<T extends TestGlobal>(shared: T) {
  return async (done) => {
    const {board, docPosts} = shared
    await Promise.all(
      docPosts.map(({id}) => {
        return Board.remove({board, id})
      })
    )
    done()
  }
}
