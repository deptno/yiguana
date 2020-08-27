import {MetadataStore} from '../../../store/dynamodb/params/create'
import {logApiAdminReport as log} from '../../../lib/log'
import {assertsAdmin} from '../../../lib/assert'

export async function all(store: MetadataStore, input: ReportAllApiInput) {
  log('all %j', input)

  assertsAdmin(input.user)

  return store.getReportsAll(input.data)
}

export type ReportAllApiInput = Yiguana.ApiInputWithUser<DynamoDB.Document>

