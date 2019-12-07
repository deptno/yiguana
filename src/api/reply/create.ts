import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {ReplyUserInput} from '../../entity/reply'
import {ApiInputWithUser} from '../../type'
import {logApiReply as log} from '../../lib/log'
import {assertNotEmptyString, assertsMemberOrNot} from '../../lib/assert'

export async function create(store: MetadataStore, ep: EntityFactory, input: CreateApiInput) {
  log('create %j', input)

  assertsMemberOrNot(input.user)
  assertNotEmptyString(input.data.content)

  return store.addComment(ep.createReply(input))
}

export type CreateApiInput = ApiInputWithUser<ReplyUserInput>
