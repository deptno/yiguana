import {DdbCategoryDocument} from '../packages/yiguana/engine/db/table-index'
import {createBoard} from './behavior/create-board'
import {list0, list} from './behavior/list-board'
import {createPost} from './behavior/create-post'
import {addPostToBoard} from './behavior/add-post-to-board'
import {removePost} from './behavior/remove-post'
import {Board} from '../packages/yiguana/entity/board'
import {Post} from '../packages/yiguana/entity/post'
import {viewPost} from './behavior/view-post'
import {likePost} from './behavior/like-post'
import {toUiPost} from './transform/post'

const shared: TestGlobal = {} as TestGlobal
export type TestGlobal = {
  board: Board
  post: Post
  docPost: DdbCategoryDocument<Post>
}

describe('list', function () {
  it('create board shared.board = ', createBoard(shared, 'ent'))
  it('list 0 items', list0(shared))
})

describe('post', function () {
  it('create board', createBoard(shared, 'ent'))
  it('create post', createPost(shared))
  it('add post to board', addPostToBoard(shared))
  it('list 1 items with log', list(shared, posts => {
    expect(posts).toHaveLength(1)
  }))
  it('view post', viewPost(shared))
  it('view post', viewPost(shared))
  it('view post', viewPost(shared))
  it('view post', viewPost(shared))
  it('view post', viewPost(shared))
  it('view post', likePost(shared))
  it('list 1 items with log', list(shared, (posts) => {
    expect(posts[0].views).toEqual(5)
    expect(posts[0].likes).toEqual(1)
    console.table(posts.map(toUiPost))
  }))
  it('remove post from board', removePost(shared))
  it('list 0 items', list0(shared))
})

