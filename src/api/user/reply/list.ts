import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {RepliesByUserIdInput} from '../../../store/dynamodb/replies-by-user-id'
import {RepliesInput} from '../../../store/dynamodb/replies'
import {logApiUserReply} from '../../../lib/log'
import {EEntity} from '../../../type'

export async function list(store: MetadataStore, ep: EntityFactory, input: ListInput) {
  log('list %j', input)

  if ('like' in input) {
    return store.repliesByUserLike({
      userId: input.userId,
      entity: EEntity.Comment,
    }) as any
  }
  return store.repliesByUserId(input as RepliesByUserIdInput)
}

export type ListInput = RepliesInput | {
  userId: string
  like?: boolean
}

const log = logApiUserReply.extend('list')
