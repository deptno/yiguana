import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {RepliesInput} from '../../store/dynamodb/replies'
import {logApiReply} from '../../lib/log'

export async function list(store: MetadataStore, ep: EntityFactory, input: ListInput) {
  log('list %j', input)
  return store.replies(input)
}

export type ListInput = RepliesInput & {
  userId?: string
  like?: boolean
}

const log = logApiReply.extend('list')
