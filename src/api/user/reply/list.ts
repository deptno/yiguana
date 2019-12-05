import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {logApiUserReply as log} from '../../../lib/log'
import {ApiInputWithUser} from '../../../type'
import {assertsMember} from '../../../lib/assert'

export async function list(store: MetadataStore, ep: EntityFactory, input: ListApiInput) {
  log('list %j', input)

  assertsMember(input.user)

  const {user: {id: userId}, data} = input

  return store.repliesByUserId({...data, userId})
}

export type ListApiInput = ApiInputWithUser<{
  exclusiveStartKey?: Exclude<any, string | number>
}>
