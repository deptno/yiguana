import {createToken, decrypt, encrypt, parseToken} from './token'

describe('페이지네이션', function () {
  let token
  it('createToken', function () {
    token = createToken(source)
    expect(typeof token).toEqual('string')
  })
  it('parseToken', function () {
    const parsed = parseToken(token)
    expect(parsed).toEqual(source)
  })
})


describe('암호화', function () {
  let encrypted

  it('should encrypt', function () {
    encrypted = encrypt(JSON.stringify(source))
    console.log(encrypted)
    console.log(encrypted.length)
  })
  it('should decrypt', function () {
    const decrypted = decrypt(encrypted)
    expect(decrypted).toEqual(JSON.stringify(source))
  })
})

const source = {
    rankedBy: 'subscriberInc#daily',
    id      : 'UCweOkPb1wVVH0Q0Tlj4a5Pw',
    range   : 'chart#subscriberInc#daily#2019-05-20',
    rank    : '2019-05-20#00020'
  }
