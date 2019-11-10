import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {PostsByCategoryInput} from '../../store/dynamodb/posts-by-category'
import {PostsInput} from '../../store/dynamodb/posts'

export async function list(store: MetadataStore, ef: EntityFactory, input: ListInput) {
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
