import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {PostsByUserIdInput} from '../../../store/dynamodb/posts-by-user-id'
import {PostsInput} from '../../../store/dynamodb/posts'

export async function list(store: MetadataStore, ef: EntityFactory, input: ListInput) {
  if (input.like) {
    return store.postsByUserLike({
      userId: input.userId,
    })
  }
  return store.postsByUserId(input as PostsByUserIdInput)
}

export type ListInput = PostsInput & {
  userId: string
  like?: boolean
}
