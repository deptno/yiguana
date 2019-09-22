import {createYiguana} from '../../../packages/yiguana'
import {ddbClient as client, tableName} from '../../env'
import {createPost} from '../../../packages/yiguana/entity/post'
import {gamePost, muckbangPost, musicPost} from '../../data/post'

jest.unmock('aws-sdk')

const boardName = 'ent'
describe('board.list', function () {
  let yiguana: ReturnType<typeof createYiguana>
  beforeAll(async done => {
    yiguana = createYiguana({tableName, client})
    const {items} = await yiguana.posts({board: boardName})
    expect(items).toHaveLength(0)
    const posts = [createPost(muckbangPost), createPost(gamePost), createPost(musicPost)]
    const postDocs = await Promise.all(posts.map(post => yiguana.addPost({boardName, post})))
    done()
  })
  afterAll(async done => {
    const {items} = await yiguana.posts({board: boardName})
    console.log(`clean up ${items.length}`)
    await Promise.all(items.map(item => yiguana.removePost({id: item.id})))
    done()
  })

  it('category all', async done => {
    const {items} = await yiguana.posts({board: boardName})
    expect(items).toHaveLength(3)

    console.table(items)
    done()
  })
  it('category game', async done => {
    const {items} = await yiguana.posts({board: boardName, category: 'game'})
    expect(items).toHaveLength(1)

    console.table(items)
    done()
  })
  it('author userId', async done => {
    // todo
//    const {items} = await yiguana.list({board, userId: 'deptno'})
//    expect(items).toHaveLength(1)
//
//    console.table(items)
   done()
  })
})
