import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory, ReplyUserInput} from '../../entity'
import {CommentUserInput} from '../../entity/comment'
import {ApiInputWithUser} from '../../type'
import {assertNotEmptyString, assertsMemberOrNot} from '../../lib/assert'
import {logApiComment as log} from '../../lib/log'

export async function createAndCreatePostIfNotExists(store: MetadataStore, ep: EntityFactory, input: CreateApiInput) {
  log('create input %j', input)

  assertsMemberOrNot(input.user)
  assertNotEmptyString(input.data.content)

  const {data, user} = input

  if ('comment' in data) {
    return store.addCommentAndCreatePostIfNotExists(ep.createReply({user, data}))
  }
  return store.addCommentAndCreatePostIfNotExists(ep.createComment({user, data}))
}

export type CreateApiInput = ApiInputWithUser<CommentUserInput | ReplyUserInput>

