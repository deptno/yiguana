import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {PostsByCategoryInput} from '../../store/dynamodb/posts-by-category'
import {PostsByUserIdInput} from '../../store/dynamodb/posts-by-user-id'
import {EEntity} from '../../entity/enum'
import {PostsInput} from '../../store/dynamodb/posts'

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
  if (input.category) { // 보드
    return store.postsByCategory(input as PostsByCategoryInput)
  }
  return store.posts(input)
}

export type ListInput = PostsInput & {
  category?: string
  userId?: string
  like?: boolean
}
