import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {CommentUserInput} from '../../entity/comment'
import {ApiInputWithUser} from '../../type'
import {assertNotEmptyString, assertsMemberOrNot} from '../../lib/assert'
import {logApiComment as log} from '../../lib/log'

export async function create(store: MetadataStore, ep: EntityFactory, input: CreateApiInput) {
  log('create input %j', input)

  assertsMemberOrNot(input.user)
  assertNotEmptyString(input.data.content)

  return store.addComment(ep.createComment(input))
}

export type CreateApiInput = ApiInputWithUser<CommentUserInput>

