import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {CommentUpdateUserInput} from '../../entity/comment'
import {ApiInput} from '../../type'
import {logApiComment} from '../../lib/log'

export async function update(store: MetadataStore, ep: EntityFactory, input: UpdateInput) {
  log('update %j', input)
  return store.updateComment(input)
}

export type UpdateInput = ApiInput<CommentUpdateUserInput>

const log = logApiComment.extend('update')
