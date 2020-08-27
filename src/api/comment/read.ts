import {MetadataStore} from '../../store/dynamodb/params/create'
import {logApiComment as log} from '../../lib/log'

export async function read(store: MetadataStore, input: ReadApiInput) {
  log('read %j', input)

  return store.get<Comment>({
    ...input.data,
    rk: Yiguana.EntityType.Comment,
  })
}

export type ReadApiInput = Yiguana.ApiInput<Yiguana.Document>
