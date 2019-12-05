import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {ApiInputWithUser, YiguanaDocumentHashRange} from '../../type'
import {logApiAdmin as log} from '../../lib/log'
import {assertNotEmptyString, assertsAdmin} from '../../lib/assert'
import {AggReportReplyInput} from '../../store/dynamodb/agg-report-reply'

export async function get(store: MetadataStore, ef: EntityFactory, input: GetApiInput) {
  log('get %j', input)

  assertsAdmin(input.user)

  return store.get(input.data)
}

export type GetApiInput = ApiInputWithUser<YiguanaDocumentHashRange>

