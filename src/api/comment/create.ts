import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {Comment, CommentUserInput} from '../../entity/comment'
import {head} from 'ramda'
import {UserApiInput} from '../../type'
import {logApiComment} from '../../lib/log'

export async function create(store: MetadataStore, ep: EntityFactory, input: CreateInput) {
  log('create %j', input)
  const data = ep.createComment(input)

  return Promise
    .all([
      store.addComment({data}),
      store.commentPost({
        data: {
          hk: input.data.postId,
        },
      }),
    ])
    .then<Comment>(head)
}

export type CreateInput = UserApiInput<CommentUserInput>

const log = logApiComment.extend('create')
