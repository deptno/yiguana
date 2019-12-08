import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory, Comment} from '../../entity'
import {ApiInput, EEntity, YiguanaDocumentHash} from '../../type'
import {logApiComment as log} from '../../lib/log'

export async function read(store: MetadataStore, ep: EntityFactory, input: ReadApiInput) {
  log('read %j', input)

  return store.get<Comment>({
    ...input.data,
    rk: EEntity.Comment,
  })
}

export type ReadApiInput = ApiInput<YiguanaDocumentHash>
