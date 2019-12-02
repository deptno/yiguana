import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {EEntity, MemberApiInput} from '../../../type'
import {logApiUserReport} from '../../../lib/log'
import {assertsMember} from '../../../lib/assert'

export async function reports(store: MetadataStore, ef: EntityFactory, input: ReportsInput) {
  log('reports %j', input)

  assertsMember(input.user)

  const {user, data} = input

  return store.reportsByUser({
    ...data,
    userId: user.id,
  })
}

export type ReportsInput = MemberApiInput<{
  entity: EEntity.Post | EEntity.Comment
  exclusiveStartKey?: any
}>

const log = logApiUserReport.extend('reports')
