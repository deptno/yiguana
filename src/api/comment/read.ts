import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb'
import {ApiInput} from '../../type'
import {logApiComment} from '../../lib/log'

export async function read(store: MetadataStore, ep: EntityFactory, input: ReadInput) {
  log('read %j', input)
  return store.comment(input.data)
}

export type ReadInput = ApiInput<YiguanaDocumentHash>

const log = logApiComment.extend('read')
