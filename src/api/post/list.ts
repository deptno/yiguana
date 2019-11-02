import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {PostsInput} from '../../store/dynamodb/posts'
import {PostsByUserIdInput} from '../../store/dynamodb/posts-by-user-id'

export async function list(store: MetadataStore, ep: EntityFactory, input: ListInput) {
  if (input.userId) {
    return store.postsByUserId(input as PostsByUserIdInput)
  }
  return store.posts(input)
}

export type ListInput = PostsInput & {
  userId?: string
}
