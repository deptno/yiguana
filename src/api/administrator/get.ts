import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {ApiInputWithUser, YiguanaDocument, YiguanaDocumentHashRange} from '../../type'
import {logApiAdmin as log} from '../../lib/log'
import {assertsAdmin} from '../../lib/assert'

export async function get<T extends YiguanaDocument>(store: MetadataStore, ef: EntityFactory, input: GetApiInput) {
  log('get %j', input)

  assertsAdmin(input.user)

  return store.get<T>(input.data)
}

export type GetApiInput = ApiInputWithUser<YiguanaDocumentHashRange>

