import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {ReplyUserInput} from '../../entity/reply'
import * as R from 'ramda'
import {ApiInputWithUser} from '../../type'
import {logApiReply as log} from '../../lib/log'
import {assertNotEmptyString, assertsMemberOrNot} from '../../lib/assert'

export async function create(store: MetadataStore, ep: EntityFactory, input: CreateApiInput) {
  log('create %j', input)

  assertsMemberOrNot(input.user)
  assertNotEmptyString(input.data.content)

  const data = ep.createReply(input)

  return Promise
    .all([
      store.addReply({data}),
      store.commentPost({
        data: {
          hk: input.data.comment.postId
        },
      }),
    ])
    .then(R.head)
}

export type CreateApiInput = ApiInputWithUser<ReplyUserInput>
