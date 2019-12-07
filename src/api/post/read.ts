import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory, Post} from '../../entity'
import {EEntity, YiguanaDocumentHash} from '../../type'
import {ApiInput} from '../../type'
import {logApiPost as log} from '../../lib/log'

export async function read(store: MetadataStore, ep: EntityFactory, input: ReadApiInput) {
  log('read %j', input)

  return store.get<Post>({
    ...input.data,
    rk: EEntity.Post
  })
}

export type ReadApiInput = ApiInput<YiguanaDocumentHash>
