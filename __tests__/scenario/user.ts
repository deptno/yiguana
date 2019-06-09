import {createYiguana} from '../../packages/yiguana'
import {tableName, ddbClient as client} from '../env'
import {deptnoUserInput} from '../data/user'
import {UserDocument} from '../../packages/yiguana/api/dynamodb/common'
import {createPost} from '../../packages/yiguana/entity/post'
import {deptnoGamePost, deptnoMusicPost, gamePost, muckbangPost, musicPost} from '../data/post'

jest.unmock('aws-sdk')

describe('user scenario', function () {
  const boardName = 'ent'
  let yiguana: ReturnType<typeof createYiguana>
  let user: UserDocument | undefined
  beforeAll(async done => {
    yiguana = createYiguana({tableName, client})
    user = await yiguana.login({user: deptnoUserInput})
    expect(user).toBeTruthy()
    expect(user!.login).toBe(1)
    const posts = [
      createPost(muckbangPost),
      createPost(gamePost),
      createPost(musicPost),
      createPost(deptnoGamePost),
      createPost(deptnoGamePost),
      createPost(deptnoMusicPost),
    ]
    const postDocs = await Promise.all(posts.map(post => yiguana.addPost({boardName, post})))
    done()
  })
  afterAll(async done => {
    if (user) {
      await yiguana.remove(user)
    }
    const {items} = await yiguana.list({boardName})
    console.log(`clean up ${items.length}`)
    await Promise.all(items.map(item => yiguana.removePost({id: item.id})))
    done()
  })

  it('유저 글 보기', async done => {
    const {items} = await yiguana.list({boardName, category: '', userId: user!.id})
    console.table(items)
    expect(items).toHaveLength(3)
    done()
  })
  it('유저 글 카테고리 별 보기', async done => {
    {
      const {items} = await yiguana.list({boardName, category: 'game', userId: user!.id})
      console.table(items)
      expect(items).toHaveLength(2)
    }
    {
      const {items} = await yiguana.list({boardName, category: 'music', userId: user!.id})
      console.table(items)
      expect(items).toHaveLength(1)
    }
    done()
  })
  it('유저 정보 보기', async () => {
    if (user) {
      const currentUser = await yiguana.user({user})
      console.log({currentUser})
      expect(currentUser).toBeTruthy()
    }
  })
  it('유저 댓글 보기', async done => {
    const user = await yiguana.login({user: deptnoUserInput})
    const {items} = await yiguana.list({boardName, category: '', userId: user!.id})
    console.table(items)
    expect(items).toHaveLength(3)
    done()
  })
})