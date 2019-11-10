import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {PostsByCategoryInput} from '../../store/dynamodb/posts-by-category'
import {PostsByUserIdInput} from '../../store/dynamodb/posts-by-user-id'
import {PostsInput} from '../../store/dynamodb/posts'

export async function list(store: MetadataStore, ep: EntityFactory, input: ListInput) {
  if (input.userId) {
    if (input.like) {
      console.info('postsByUserLike')
      return store.postsByUserLike({
        userId: input.userId
      })
    }
    console.info('postsByUserId')
    return store.postsByUserId(input as PostsByUserIdInput)
  }
  if (input.category) { // 보드
    console.info('postsByCategory')
    return store.postsByCategory(input as PostsByCategoryInput)
  }
  console.info('posts')
  return store.posts(input)
}

export type ListInput = PostsInput & {
  category?: string
  userId?: string
  like?: boolean
}
