import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {EEntity} from '../../../entity/enum'
import {RepliesByUserIdInput} from '../../../store/dynamodb/replies-by-user-id'
import {RepliesInput} from '../../../store/dynamodb/replies'

export async function list(store: MetadataStore, ep: EntityFactory, input: ListInput) {
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