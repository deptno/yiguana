import {MetadataStore} from '../../../store/dynamodb'
import {logApiAdminReport as log} from '../../../lib/log'
import {assertsAdmin} from '../../../lib/assert'
import {ReportsInput} from '../../../store/dynamodb/get-reports'

export async function list(store: MetadataStore, input: ReportListApiInput) {
  log('list %j', input)

  assertsAdmin(input.user)

  return store.getReports(input.data)
}

export type ReportListApiInput = Yiguana.ApiInputWithUser<ReportsInput>

