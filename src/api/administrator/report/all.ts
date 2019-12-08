import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {logApiAdminReport as log} from '../../../lib/log'
import {ApiInputWithUser} from '../../../type'
import {assertsAdmin} from '../../../lib/assert'
import {GetAllReportsInput} from '../../../store/dynamodb/get-all-reports'

export async function all(store: MetadataStore, ef: EntityFactory, input: ReportAllApiInput) {
  log('all %j', input)

  assertsAdmin(input.user)

  return store.getReportsAll(input.data)
}

export type ReportAllApiInput = ApiInputWithUser<GetAllReportsInput>

