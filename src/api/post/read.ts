import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../type'
import {ApiInput} from '../../type'
import {logApiPost as log} from '../../lib/log'

export async function read(store: MetadataStore, ep: EntityFactory, input: ReadApiInput) {
  log('read %j', input)

  return store.post(input.data)
}

export type ReadApiInput = ApiInput<YiguanaDocumentHash>
