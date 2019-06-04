import * as Board from '../packages/yiguana/entity/board'
import * as Post from '../packages/yiguana/entity/post'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {config, SharedIniFileCredentials} from 'aws-sdk'

const region = 'ap-northeast-2'
const credentials = new SharedIniFileCredentials({profile: 'googit'})
config.credentials = credentials

const ddbClient = new DocumentClient({region})
const tableName = 'dev-yiguana'

let board
let post

describe('list', function () {
  it('create board', () => {
    board = Board.create({
      name  : '먹방',
      client: ddbClient,
      tableName
    })
    console.log(board)
  })
  it('list items', async done => {
    try {
      const page1 = await Board.list({
        board,
      })
      console.table(page1.items)
    } catch (e) {
      console.error({e})
    } finally {
      done()
    }
  })

})
describe('post', function () {
  it('create board', () => {
    board = Board.create({
      name  : '먹방',
      client: ddbClient,
      tableName
    })
    console.log(board)
  })
  it('create post', async function (done) {
    post = Post.create({
      title   : '글 제목',
      content : `글 내용`,
      category: '먹방',
      author  : {
        id       : 'userId',
        name     : 'username',
        thumbnail: 'https://yt3.ggpht.com/a/AGF-l79onoRiL-_eGcsLNc92BmCJKd5FtGJrsSo0mw=s240-mo-c-c0xffffffff-rj-k-no'
      }
    })
    done()
  })
  it('add post to board', async function (done) {
    await Board.add({board, post})
    done()
  })
  it('list items', async done => {
    try {
      const page1 = await Board.list({
        board,
      })
      console.table(page1.items)
    } catch (e) {
      console.error({e})
    } finally {
      done()
    }
  })
})
