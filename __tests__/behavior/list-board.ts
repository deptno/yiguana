import {TestGlobal} from '../scenario'
import * as Board from '../../packages/yiguana/entity/board'
import {DdbCategoryDocument} from '../../packages/yiguana/engine/db/table-index'
import {Post} from '../../packages/yiguana/entity/post'

export function list0<T extends TestGlobal>(shared: T) {
  return async (done) => {
    try {
      const page1 = await Board.list({board: shared.board})
      expect(page1.items).toHaveLength(0)
    } catch (e) {
      console.error({e})
    } finally {
      done()
    }
  }
}

export function list<T extends TestGlobal>(shared: T, tap?: (post: DdbCategoryDocument<Post>[]) => void) {
  return async (done) => {
    try {
      const page1 = await Board.list({board: shared.board})
      expect(page1.items).toHaveLength(1)
      if (tap) {
        tap(page1.items)
      }
    } catch (e) {
      console.error({e})
    } finally {
      done()
    }
  }
}


