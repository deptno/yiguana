import {createYiguana} from '../../packages/yiguana'
import {ddbClient, tableName, s3Client, bucketName} from '../env'
import {deptnoUserInput} from '../data/user'
import {UserDocument} from '../../packages/yiguana/api/dynamodb/common'
import {createPost} from '../../packages/yiguana/entity/post'
import {deptnoGamePost, deptnoMusicPost, gamePost, muckbangPost, musicPost} from '../data/post'
import {createComment, EPriority} from '../../packages/yiguana/entity/comment'

jest.unmock('aws-sdk')

describe('user scenario', function () {
  const boardName = 'ent'
  const yiguana = createYiguana({
    tableName,
    ddbClient,
    s3Client,
    bucketName
  })
  let user: UserDocument | undefined
  beforeAll(async done => {
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
    const {items} = await yiguana.posts({board: boardName})
    console.log(`clean up ${items.length}`)
    await Promise.all(items.map(item => yiguana.removePost({id: item.id})))
    done()
  })

  it('유저 글 목록 보기', async done => {
    const {items} = await yiguana.posts({board: boardName, category: '', userId: user!.id})
    console.table(items)
    expect(items).toHaveLength(3)
    done()
  })
  it('유저 글 목록 카테고리 별 보기', async done => {
    {
      const {items} = await yiguana.posts({board: boardName, category: 'game', userId: user!.id})
      console.table(items)
      expect(items).toHaveLength(2)
    }
    {
      const {items} = await yiguana.posts({board: boardName, category: 'music', userId: user!.id})
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
  it('유저 글 및 댓글 보기', async done => {
    const user = await yiguana.login({user: deptnoUserInput})
    const {items} = await yiguana.posts({board: boardName, category: '', userId: user!.id})
    console.table(items)
    expect(items).toHaveLength(3)
    const [post] = items
    const postViewing = await yiguana.viewPost({post})
    if (postViewing) {
      if (user) {
        const comment = createComment({
          postId: postViewing.id,
          userId: user.id,
          user: {
            id: user.id,
            name: user.name,
          },
          comment: `parent post(${postViewing.id}) reply`,
          priority: EPriority.Normal,
          ip: '255.255.255.255'
        })
        // todo add
      }
    }
    done()
  })
})
