import {MetadataStore} from '../../../store/dynamodb/params/create'
import {logApiAdminAggReport as log} from '../../../lib/log'
import {assertsAdmin} from '../../../lib/assert'
import {AggReportsInput} from '../../../store/dynamodb/params/read/get-agg-reports'

export async function list(store: MetadataStore, input: AggReportListApiInput) {
  log('list %j', input)

  assertsAdmin(input.user)

  return store.getAggReports(input.data)
}

export type AggReportListApiInput = Yiguana.ApiInputWithUser<AggReportsInput>

