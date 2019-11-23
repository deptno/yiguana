import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {PostsByCategoryInput} from '../../store/dynamodb/posts-by-category'
import {PostsInput} from '../../store/dynamodb/posts'
import {logApiPost} from '../../lib/log'

export async function list(store: MetadataStore, ef: EntityFactory, input: ListInput) {
  log('list %j', input)
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

const log = logApiPost.extend('list')