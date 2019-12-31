import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory, Member, NonMember} from '../../entity'
import {ApiInputWithUser, YiguanaDocumentHash} from '../../type'
import {logApiPost as log} from '../../lib/log'
import {assertsMemberOrNot} from '../../lib/assert'

export async function del(store: MetadataStore, ep: EntityFactory, input: DelApiInput) {
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

export type DelApiInput = ApiInputWithUser<YiguanaDocumentHash>
