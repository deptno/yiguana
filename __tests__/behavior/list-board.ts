import {TestGlobal} from '../global'
import * as Board from '../../packages/yiguana/entity/board'
import {DdbCategoryDocument} from '../../packages/yiguana/engine/db/table-index'
import {Post} from '../../packages/yiguana/entity/post'

export function list0<T extends TestGlobal>(shared: T) {
  return async (done) => {
    try {
      const page1 = await Board.list({board: shared.board})
      shared.docPosts = page1.items
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
      shared.docPosts = page1.items
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

export function categoryList<T extends TestGlobal>(shared: T, category: string, tap?: (post: DdbCategoryDocument<Post>[]) => void) {
  return async (done) => {
    try {
      const page1 = await Board.list({board: shared.board, category})
      shared.docPosts = page1.items
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
