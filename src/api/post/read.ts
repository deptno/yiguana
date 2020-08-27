import {MetadataStore} from '../../store/dynamodb'
import {logApiPost as log} from '../../lib/log'
import {Post} from '../../model'

export async function read(store: MetadataStore, input: ReadApiInput) {
  log('read %j', input)

  return store.get<Post>({
    ...input.data,
    rk: Yiguana.EntityType.Post
  })
}

export type ReadApiInput = Yiguana.ApiInput<Yiguana.Document>
