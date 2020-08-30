import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {PostsInput} from '../../store/dynamodb/get-posts'
import {ApiInput} from '../../type'
import {logApiPost as log} from '../../lib/log'

export async function list(store: MetadataStore, ef: EntityFactory, input: ListApiInput) {
  log('list %j', input)

  const {data} = input

  if ('childrenUpdatedAt' in data) {
    return store.getPostsByChildrenUpdatedAt(data)
  }
  if ('category' in data) {
    return store.getPostsByCategory(data)
  }

  return store.getPosts(data)
}

export type ListApiInput = ApiInput<
  | PostsInput
  | (PostsInput & { category: string })
  | (PostsInput & { childrenUpdateAt: true })
>
