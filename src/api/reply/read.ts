import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {logApiReply} from '../../lib/log'
import {ApiInput, YiguanaDocumentHash} from '../../type'

export async function read(store: MetadataStore, ep: EntityFactory, input: ReadInput) {
  log('read %j', input)
//  return store.reply(input.data)
}

export type ReadInput = ApiInput<YiguanaDocumentHash>

const log = logApiReply.extend('read')
