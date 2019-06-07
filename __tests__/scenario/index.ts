import {createBoard} from '../behavior/create-board'
import {categoryList, list, list0} from '../behavior/list-board'
import {createGamePost, createMukbangPost, createMusicPost} from '../behavior/create-post'
import {addPostToBoard} from '../behavior/add-post-to-board'
import {removePost, removePosts} from '../behavior/remove-post'
import {viewPost} from '../behavior/view-post'
import {likePost} from '../behavior/like-post'
import {toUiPost} from '../transform/post'
import {shared} from '../global'

jest.unmock('aws-sdk')

describe('보드 생성', function () {
  it('create board', createBoard(shared, 'ent'))
  it('list 0 items', list0(shared))
})

describe('포스트 생성 및 액션', function () {
  it('create board', createBoard(shared, 'ent'))
  it('list 0 items', list0(shared))
  it('create post', createMukbangPost(shared))
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
describe('카테고리 테스트', function () {
  it('create board', createBoard(shared, 'ent'))
  it('list 0 items', list0(shared))
  it('create post', createMukbangPost(shared))
  it('add post to board', addPostToBoard(shared))
  it('create post', createMusicPost(shared))
  it('add post to board', addPostToBoard(shared))
  it('create post', createGamePost(shared))
  it('add post to board', addPostToBoard(shared))
  it('create post', createGamePost(shared))
  it('add post to board', addPostToBoard(shared))
  it('category list with log', categoryList(shared, 'game', posts => {
    console.table(posts.map(toUiPost))
    expect(posts).toHaveLength(2)
  }))
  it('list items with log', list(shared, posts => {
    console.table(posts.map(toUiPost))
    expect(posts).toHaveLength(4)
  }))
  it('delay 10 seconds', done => setTimeout(done, 10000), 15000)
//  it('remove post from board', removePosts(shared))
//  it('list 0 items', list0(shared))
})

describe('사람으로 검색(most likes)', function () {
  // 클리앙 참조해서 GSI 구성, 이미지(author.thumbnail) 불 필요 할 수 있음(projection), 10개 기준 rcu 1 가능해보임
  // pk: userId, rk: author#
  // pk: userId, rk: post#[date]
})
describe('인기글(most likes, views, comments)', function () {
  // 일별 스캔이 나을 수 있음
  // type(range) + createdAt, views, likes, comments
  // write 가 과도하게 일어날 수 있음 project 잘고민

  // 혹은 begins_with(range, [board]#) 로 처리하여 날짜로 스캔을 걸고 result 가 0일 떄 스톱하는 방식이 더 저렴할 수 있음.
})
describe('페이지네이션 테스트', function () {

})
