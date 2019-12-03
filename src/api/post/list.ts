import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {PostsInput} from '../../store/dynamodb/posts'
import {ApiInput} from '../../type'
import {logApiPost as log} from '../../lib/log'

export async function list(store: MetadataStore, ef: EntityFactory, input: ListApiInput) {
  log('list %j', input)

  const {data} = input

  if ('category' in data) { // 보드
    return store.postsByCategory(data)
  }

  return store.posts(data)
}

export type ListApiInput = ApiInput<PostsInput | (PostsInput & { category: string })>
