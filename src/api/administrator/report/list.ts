import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {logApiAdminReport as log} from '../../../lib/log'
import {ApiInputWithUser} from '../../../type'
import {assertsAdmin} from '../../../lib/assert'
import {ReportsInput} from '../../../store/dynamodb/get-reports'

export async function list(store: MetadataStore, ef: EntityFactory, input: ReportListApiInput) {
  log('list %j', input)

  assertsAdmin(input.user)

  return store.getReports(input.data)
}

export type ReportListApiInput = ApiInputWithUser<ReportsInput>

