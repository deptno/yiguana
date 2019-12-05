import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {ApiInputWithUser, YiguanaDocumentHash} from '../../type'
import {logApiPost as log} from '../../lib/log'
import {assertsMemberOrNot} from '../../lib/assert'

export async function del(store: MetadataStore, ep: EntityFactory, input: DelApiInput) {
  log('del %j', input)

  assertsMemberOrNot(input.user)

  return store.removePost({hk: input.data.hk})
}

export type DelApiInput = ApiInputWithUser<YiguanaDocumentHash>
