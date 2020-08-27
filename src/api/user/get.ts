import {MetadataStore} from '../../store/dynamodb'
import {logApiUser as log} from '../../lib/log'
import {assertsMemberOrNot} from '../../lib/assert'

export async function get<T extends Yiguana.Document>(store: MetadataStore, input: GetApiInput) {
  log('get %j', input)

  assertsMemberOrNot(input.user)

  return store.get<T>(input.data)
}

export type GetApiInput = Yiguana.ApiInputWithUser<Yiguana.Document>

