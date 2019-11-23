import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {ReplyUpdateUserInput} from '../../entity/reply'
import {UserApiInput} from '../../type'
import {logApiReply} from '../../lib/log'

export async function update(store: MetadataStore, ep: EntityFactory, input: UpdateInput) {
  log('update %j', input)
  return store.updateReply(input)
}

export type UpdateInput = UserApiInput<ReplyUpdateUserInput>

const log = logApiReply.extend('update')
