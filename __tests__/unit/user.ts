// todo 로그인
// todo 글보기
// todo 댓글보기

import {ddbClient as client, tableName} from '../env'
import {createYiguana} from '../../packages/yiguana'
import {UserDocument} from '../../packages/yiguana/api/dynamodb/common'

jest.unmock('aws-sdk')

describe('user', function () {
  let yiguana: ReturnType<typeof createYiguana>
  let user: UserDocument|undefined
  beforeAll(async done => {
    yiguana = createYiguana({tableName, client})
    user = await yiguana.login({user: {
        id: 'deptno',
        name: 'Bonggyun Lee',
      }})
    expect(user).toBeTruthy()
    expect(user!.login).toBe(1)
    done()
  })
  afterAll(async done => {
    if (user) {
      await yiguana.remove(user)
    }
    done()
  })

  it('로그인', async done => {
    const user = await yiguana.login({user: {
        id: 'deptno',
        name: 'Bonggyun Lee',
      }})
    expect(user!.login).toBe(2)
    done()
  })
  it('유저 정보 가져오기', async done => {
    const currentUser = await yiguana.user({user: user!})
    expect(currentUser).toBeTruthy()
    done()
  })
})
