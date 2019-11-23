import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {ReplyUserInput} from '../../entity/reply'
import * as R from 'ramda'
import {UserApiInput} from '../../type'
import {logApiReply} from '../../lib/log'

export async function create(store: MetadataStore, ep: EntityFactory, input: CreateInput) {
  log('create %j', input)

  return Promise
    .all([
      store.addReply({data: ep.createReply(input)}),
      store.commentPost({
        data: {
          hk: input.data.comment.postId
        },
      }),
    ])
    .then(R.head)
}

export type CreateInput = UserApiInput<ReplyUserInput>

const log = logApiReply.extend('create')
