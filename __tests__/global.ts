import {Board} from '../packages/yiguana/entity/board'
import {Post} from '../packages/yiguana/entity/post'
import {PostDocument} from '../packages/yiguana/engine/db/document'

export const shared: TestGlobal = {} as TestGlobal
export type TestGlobal = {
  board: Board
  post: Post
  docPost: PostDocument
  docPosts: PostDocument[]
}
