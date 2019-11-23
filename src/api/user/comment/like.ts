import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {Comment} from '../../../entity/comment'
import * as R from 'ramda'
import {LikeCommentApiInput} from '../../../type'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeInput) {
  const {data: param, user} = input
  const {data, createdAt} = param

  if (!user) {
    throw new Error('user is required')
  }
  if (!('id' in user)) {
    throw new Error('user.id is required')
  }

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
