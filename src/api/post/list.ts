import {MetadataStore} from '../../store/dynamodb'
import {PostsInput} from '../../store/dynamodb/get-posts'
import {logApiPost as log} from '../../lib/log'

export async function list(store: MetadataStore, input: ListApiInput) {
  log('list %j', input)

  const {data} = input

  if ('category' in data) { // 보드
    return store.getPostsByCategory(data)
  }

  return store.getPosts(data)
}

export type ListApiInput = Yiguana.ApiInput<PostsInput | (PostsInput & { category: string })>
