import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {UserApiInput} from '../../type'
import {logApiPost} from '../../lib/log'

export async function del(store: MetadataStore, ep: EntityFactory, input: UserApiInput<DelInput>): Promise<boolean> {
  log('del %j', input)
  return store.removePost({hk: input.data.hk})
}

export type DelInput = YiguanaDocumentHash

const log = logApiPost.extend('del')
