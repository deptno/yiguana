import {YiguanaPost} from '../../entity'

describe('yiguana', function () {
  it('YiguanaPost 생성', function () {
    const post = new YiguanaPost({
      title: '글제목',
      board: '채널신청게시판',
      ip: '127.0.0.1',
      content: '글 내용',
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
      content: '글 내용',
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
})
