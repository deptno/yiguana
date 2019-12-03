import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {logApiAdminAggReport as log} from '../../../lib/log'
import {ApiInputWithUser} from '../../../type'
import {assertsAdmin} from '../../../lib/assert'
import {AggReportsInput} from '../../../store/dynamodb/agg-reports'

export async function list(store: MetadataStore, ef: EntityFactory, input: AggReportListApiInput) {
  log('list %j', input)

  assertsAdmin(input.user)

  return store.aggReports(input.data)
}

export type AggReportListApiInput = ApiInputWithUser<AggReportsInput>

