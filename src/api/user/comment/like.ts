import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {Comment} from '../../../entity/comment'
import * as R from 'ramda'
import {LikeCommentApiInput} from '../../../type'
import {logApiUserComment} from '../../../lib/log'
import {assertsMember} from '../../../lib/assert'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeInput) {
  log('like %j', input)

  assertsMember(input.user)

  const {data: param, user} = input
  const {data, createdAt} = param
  const like = await store.addLike({
    data: ep.createLike({
      user,
      data: {
        data,
        createdAt,
      },
    }),
  })

  if (like) {
    return store.likeComment({data: data})
  }

  return Promise
    .all([
      store.removeLike({data, userId: user.id}),
      store.unlikeComment({data}),
    ])
    .then<Comment>(R.view(R.lensIndex(1)))
}

export type LikeInput = LikeCommentApiInput

const log = logApiUserComment.extend('like')
