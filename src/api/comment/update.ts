import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {CommentUpdateUserInput} from '../../entity/comment'
import {ApiInputWithUser} from '../../type'
import {logApiComment as log} from '../../lib/log'
import {assertsMemberOrNot} from '../../lib/assert'

export async function update(store: MetadataStore, ep: EntityFactory, input: UpdateApiInput) {
  log('update %j', input)

  assertsMemberOrNot(input.user)

  return store.updateComment(input.data)
}

export type UpdateApiInput = ApiInputWithUser<CommentUpdateUserInput>
