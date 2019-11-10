import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {RepliesInput} from '../../store/dynamodb/replies'
import {EEntity} from '../../entity/enum'
import {RepliesByUserIdInput} from '../../store/dynamodb/replies-by-user-id'

export async function list(store: MetadataStore, ep: EntityFactory, input: ListInput) {
  if (input.userId) {
    if (input.like) {
      return store.repliesByUserLike({
        userId: input.userId,
        entity: EEntity.Comment
      }) as any
    }
    return store.repliesByUserId(input as RepliesByUserIdInput)
  }
  return store.replies(input)
}

export type ListInput = RepliesInput & {
  userId?: string
  like?: boolean
}
