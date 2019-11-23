import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb'
import {ApiInput} from '../../type'
import {logApiReply} from '../../lib/log'

export async function del(store: MetadataStore, ep: EntityFactory, input: DelInput) {
  log('del %j', input)
  return store.removeReply({hk: input.data.hk})
}

export type DelInput = ApiInput<YiguanaDocumentHash>

const log = logApiReply.extend('del')
