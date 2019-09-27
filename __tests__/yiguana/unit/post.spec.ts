import {YiguanaPost} from '../../../packages/yiguana/entity'
import {createYiguana} from '../../../packages/yiguana'
import {ddbClient as client, tableName} from '../../env'
import {createPost} from '../../../packages/yiguana/entity/post'
import {gamePost, muckbangPost, musicPost} from '../../data/post'

describe('yiguana', function () {
  it('YiguanaPost 생성', function () {
    const post = new YiguanaPost({
      title: '글제목',
      board: '채널신청게시판',
      ip: '127.0.0.1',
      contentUrl: '글 내용',
      author: {
        name: '비회원 이름',
      },
      password: '123',
      createdAt: 'date', // FIXME: 빨간 줄 에러를 막기 위해 임시로 넣은 값
    })
    expect(post).toHaveProperty('hk')
    expect(post).toHaveProperty('rk')
  })
  it('YiguanaPost 조회', function () {
    const post = new YiguanaPost({
      title: '글제목',
      board: '채널신청게시판',
      ip: '127.0.0.1',
      contentUrl: '글 내용',
      author: {
        name: '비회원 이름',
      },
      password: '123',
      createdAt: 'date', // FIXME: 빨간 줄 에러를 막기 위해 임시로 넣은 값
    })
    expect(post).toHaveProperty('hk')
    expect(post).toHaveProperty('rk')
  })
  it('YiguanaPost 삭제', function() {

  })
  describe('레거시', function() {
    const board = 'ent'
    let yiguana: ReturnType<typeof createYiguana>
    beforeAll(async done => {
      yiguana = createYiguana({tableName, client})
      const {items} = await yiguana.posts({board})
      expect(items).toHaveLength(0)
      const posts = [createPost(muckbangPost), createPost(gamePost), createPost(musicPost)]
      const postDocs = await Promise.all(posts.map(post => yiguana.addPost({board, post})))
      done()
    })
    afterAll(async done => {
      const {items} = await yiguana.posts({board})
      console.log(`clean up ${items.length}`)
      await Promise.all(items.map(item => yiguana.removePost({id: item.id})))
      done()
    })

    it('add, remove, view, like post', async done => {
      const {items: postDocs} = await yiguana.posts({board})

      await Promise.all(postDocs.map(doc => yiguana.viewPost({post: doc})))
      await yiguana.likePost({post: postDocs[0]})

      const {items} = await yiguana.posts({board})
      expect(items).toHaveLength(3)

      console.table(items)

      expect(items.reduce((acc, item) => acc + item.views, 0)).toBe(3)
      expect(items.reduce((acc, item) => acc + item.likes, 0)).toBe(1)

      done()
    })
  })
})
