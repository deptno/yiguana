import {MetadataStore} from '../../../store/dynamodb/params/create'
import {logApiUserReport as log} from '../../../lib/log'
import {assertsMember} from '../../../lib/assert'

export async function list(store: MetadataStore, input: ReportsInput) {
  log('list %j', input)

  assertsMember(input.user)

  const {user, data} = input

  return store.getReportsByUser({
    ...data,
    userId: user.id,
  })
}

export type ReportsInput = Yiguana.ApiInputWithUser<{
  entity: Yiguana.EntityType.Post | Yiguana.EntityType.Comment
  exclusiveStartKey?: any
}>
