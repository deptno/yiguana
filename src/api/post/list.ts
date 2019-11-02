import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {PostsInput} from '../../store/dynamodb/posts'
import {PostsByUserIdInput} from '../../store/dynamodb/posts-by-user-id'
import {EEntity} from '../../entity/enum'

export async function list(store: MetadataStore, ep: EntityFactory, input: ListInput) {
  if (input.userId) {
    if (input.like) {
      return store.postsByUserLike({
        userId: input.userId,
        entity: EEntity.Post
      })
    }
    return store.postsByUserId(input as PostsByUserIdInput)
  }
  return store.posts(input)
}

export type ListInput = PostsInput & {
  userId?: string
  like?: boolean
}
