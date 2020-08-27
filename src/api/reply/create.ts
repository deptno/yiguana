import {MetadataStore} from '../../store/dynamodb'
import {logApiReply as log} from '../../lib/log'
import {assertNotEmptyString, assertsMemberOrNot} from '../../lib/assert'
import {Reply} from '../../model'

export async function create(store: MetadataStore, input: CreateApiInput) {
  log('create %j', input)

  assertsMemberOrNot(input.user)
  assertNotEmptyString(input.data.content)

  return store.addComment(Reply.of(input))
}

export type CreateApiInput = Yiguana.ApiInputWithUser<ReplyUserInput>
