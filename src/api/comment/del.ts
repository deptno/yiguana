import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../type'
import {ApiInput} from '../../type'
import {logApiComment} from '../../lib/log'

export async function del(store: MetadataStore, ep: EntityFactory, input: DelInput) {
  log('del %j', input)
  return store.removeComment({hk: input.data.hk})
}

export type DelInput = ApiInput<YiguanaDocumentHash>

const log = logApiComment.extend('del')
