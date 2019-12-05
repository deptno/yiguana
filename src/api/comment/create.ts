import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {Comment, CommentUserInput} from '../../entity/comment'
import {head} from 'ramda'
import {ApiInputWithUser} from '../../type'
import {assertNotEmptyString, assertsMemberOrNot} from '../../lib/assert'
import {logApiComment as log} from '../../lib/log'

export async function create(store: MetadataStore, ep: EntityFactory, input: CreateApiInput) {
  log('create %j', input)

  assertsMemberOrNot(input.user)
  assertNotEmptyString(input.data.content)

  const data = ep.createComment(input)

  return Promise
    .all([
      store.put(data),
      store.commentPost({
        data: {
          hk: input.data.postId,
        },
      }),
    ])
    .then<Comment>(head)
}

export type CreateApiInput = ApiInputWithUser<CommentUserInput>

