import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {ApiInput, YiguanaDocumentHash} from '../../type'
import {logApiComment as log} from '../../lib/log'

export async function read(store: MetadataStore, ep: EntityFactory, input: ReadApiInput) {
  log('read %j', input)

  return store.comment(input.data)
}

export type ReadApiInput = ApiInput<YiguanaDocumentHash>
