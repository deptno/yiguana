import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {ApiInputWithUser, YiguanaDocumentHash} from '../../type'
import {logApiComment as log} from '../../lib/log'
import {assertsMemberOrNot} from '../../lib/assert'

export async function del(store: MetadataStore, ep: EntityFactory, input: DelApiInput) {
  log('del %j', input)

  assertsMemberOrNot(input.user)

  return store.removeComment(input.data)
}

export type DelApiInput = ApiInputWithUser<YiguanaDocumentHash>
