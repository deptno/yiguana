import {MetadataStore} from '../../store/dynamodb'
import {assertNotEmptyString, assertsMemberOrNot} from '../../lib/assert'
import {logApiComment as log} from '../../lib/log'

export async function create(store: MetadataStore, input: CreateApiInput) {
  log('create input %j', input)

  assertsMemberOrNot(input.user)
  assertNotEmptyString(input.data.content)

  const {data, user} = input

  if ('comment' in data) {
    return store.addComment(ep.createReply({user, data}))
  }
  return store.addComment(ep.createComment({user, data}))
}

export type CreateApiInput = Yiguana.ApiInputWithUser<CommentUserInput | ReplyUserInput>

