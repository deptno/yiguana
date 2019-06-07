import {createYiguana} from '../../packages/yiguana'
import {ddbClient as client, tableName} from '../env'
import {createPost} from '../../packages/yiguana/entity/post'
import {gamePost, muckbangPost, musicPost} from '../data/post'

jest.unmock('aws-sdk')

const boardName = 'ent'
describe('post', function () {
  let yiguana: ReturnType<typeof createYiguana>
  beforeAll(async done => {
    yiguana = createYiguana({tableName, client})
    const {items} = await yiguana.list({boardName})
    expect(items).toHaveLength(0)
    const posts = [createPost(muckbangPost), createPost(gamePost), createPost(musicPost)]
    const postDocs = await Promise.all(posts.map(post => yiguana.addPost({boardName, post})))
    done()
  })
  afterAll(async done => {
    const {items} = await yiguana.list({boardName})
    console.log(`clean up ${items.length}`)
    await Promise.all(items.map(item => yiguana.removePost({id: item.id})))
    done()
  })

  it('add, remove, view, like post', async done => {
    const {items: postDocs} = await yiguana.list({boardName})

    await Promise.all(postDocs.map(doc => yiguana.viewPost({post: doc})))
    await yiguana.likePost({post: postDocs[0]})

    const {items} = await yiguana.list({boardName})
    expect(items).toHaveLength(3)

    console.table(items)

    expect(items.reduce((acc, item) => acc + item.views, 0)).toBe(3)
    expect(items.reduce((acc, item) => acc + item.likes, 0)).toBe(1)

    done()
  })
  it('pagination', async done => {
    // todo add posts
    done()
  })
})
