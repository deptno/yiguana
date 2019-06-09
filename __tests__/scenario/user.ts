// todo 로그인
// todo 글보기
// todo 댓글보기

import {ddbClient as client, tableName} from '../env'
import {createYiguana} from '../../packages/yiguana'
import {deptnoUserInput} from '../data/user'
jest.unmock('aws-sdk')

describe('user', function () {
  let yiguana: ReturnType<typeof createYiguana>
  beforeAll(async done => {
    done()
  })
  afterAll(async done => {
    done()
  })

  it('로그인', async done => {
    yiguana = createYiguana({tableName, client})
    const user = await yiguana.login({
      user: deptnoUserInput
    })
    expect(user).toBeTruthy()
    expect(user!.login).toBe(1)
    {
      const user = await yiguana.login({
        user: deptnoUserInput
      })
      expect(user!.login).toBe(2)
    }
    await yiguana.remove({
      id: user!.id,
      range: user!.range
    })
    done()
  })
  it('유저 글 보기', async done => {done()})
  it('유저 댓글 보기', async done => {done()})
})
