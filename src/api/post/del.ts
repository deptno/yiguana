import {MetadataStore} from '../../store/dynamodb'
import {logApiPost as log} from '../../lib/log'
import {assertsMemberOrNot} from '../../lib/assert'

export async function del(store: MetadataStore, input: DelApiInput) {
  log('del %j', input)

  assertsMemberOrNot(input.user)

  const comment = await store.removePost({
    hk: input.data.hk,
    user: input.user
  })

  if (!comment) {
    throw new Error('fail')
  }

  return comment
}

export type DelApiInput = Yiguana.ApiInputWithUser<Yiguana.Document>
