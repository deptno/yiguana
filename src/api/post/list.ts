import {logApiPost as log} from '../../lib/log'

export async function list(store: MetadataStore, input: ListApiInput) {
  log('list %j', input)

  const {data} = input

  if ('category' in data) { // 보드
    return store.getPostsByCategory(data)
  }

  return store.getPosts(data)
}

export type ListApiInput = Yiguana.ApiInput<DynamoDB.Pagination | (DynamoDB.Pagination & { category: string })>
