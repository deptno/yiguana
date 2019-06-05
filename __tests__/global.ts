import {Board} from '../packages/yiguana/entity/board'
import {Post} from '../packages/yiguana/entity/post'
import {DdbCategoryDocument} from '../packages/yiguana/engine/db/table-index'

export const shared: TestGlobal = {} as TestGlobal
export type TestGlobal = {
  board: Board
  post: Post
  docPost: DdbCategoryDocument<Post>
  docPosts: DdbCategoryDocument<Post>[]
}
