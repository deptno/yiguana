import * as Board from '../packages/serverless-board/entity/board'
import * as Post from '../packages/serverless-board/entity/post'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'

const ddbClient = new DocumentClient()
const tableName = 'dev-yiguana'

describe('scenario', function () {
  let board
  it('create board', () => {
    board = Board.create({
      name     : '먹방',
      client   : ddbClient,
      tableName
    })
    console.log(board)
  })
  it('create post', async function (done) {
    const post = Post.create({
      title: '글 제목',
      content: `글 내용`
    })
    await Board.add({board, post})
    done()
  })
})
