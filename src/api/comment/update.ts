import {MetadataStore} from '../../store/dynamodb/params/create'
import {logApiComment as log} from '../../lib/log'
import {assertsMemberOrNot} from '../../lib/assert'

export async function update(store: MetadataStore, input: UpdateApiInput) {
  log('update %j', input)

  assertsMemberOrNot(input.user)

  return store.updateComment(input.data)
}

export type UpdateApiInput = Yiguana.ApiInputWithUser<CommentUpdateUserInput>
