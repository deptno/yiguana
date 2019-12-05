import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {EEntity, ApiInputWithUser} from '../../../type'
import {logApiUserReport as log} from '../../../lib/log'
import {assertsMember} from '../../../lib/assert'

export async function list(store: MetadataStore, ef: EntityFactory, input: ReportsInput) {
  log('list %j', input)

  assertsMember(input.user)

  const {user, data} = input

  return store.reportsByUser({
    ...data,
    userId: user.id,
  })
}

export type ReportsInput = ApiInputWithUser<{
  entity: EEntity.Post | EEntity.Comment
  exclusiveStartKey?: any
}>
