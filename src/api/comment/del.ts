import {MetadataStore} from '../../store/dynamodb/params/create'
import {logApiComment as log} from '../../lib/log'
import {assertsMemberOrNot} from '../../lib/assert'

export async function del(store: MetadataStore, input: DelApiInput) {
  log('del %j', input)

  assertsMemberOrNot(input.user)

  const post = await store.removeComment({
    hk: input.data.hk,
    user: input.user
  })

  if (!post) {
    throw new Error('fail')
  }

  return post
}

export type DelApiInput = Yiguana.ApiInputWithUser<Yiguana.Document>
