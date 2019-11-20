import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb'
import {ApiInput} from '../../type'
import {logApiPost} from '../../lib/log'

export async function read(store: MetadataStore, ep: EntityFactory, input: ApiInput<ReadInput>) {
  log('read %j', input)
  return store.post(input.data)
}

export type ReadInput = YiguanaDocumentHash

const log = logApiPost.extend('read')
