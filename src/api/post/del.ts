import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb'
import {UserApiInput} from '../../type'
import {logApiPost} from '../../lib/log'

export async function del(store: MetadataStore, ep: EntityFactory, input: DelInput) {
  log('del %j', input)
  return store.removePost({hk: input.data.hk})
}

export type DelInput = UserApiInput<YiguanaDocumentHash>

const log = logApiPost.extend('del')
