import {MetadataStore} from '../../../store/dynamodb'
import {Comment, EntityFactory} from '../../../entity'
import * as R from 'ramda'
import {ApiInputWithUser} from '../../../type'
import {logApiUserComment as log} from '../../../lib/log'
import {assertsMember} from '../../../lib/assert'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeApiInput) {
  log('like %j', input)

  assertsMember(input.user)

  const {user} = input
  const {data, createdAt} = input.data
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
    return store.incLikes(data)
  }

  return Promise
    .all([
      store.removeLike({
        data,
        userId: user.id
      }),
      store.decLikes(data),
    ])
    .then<Comment>(R.view(R.lensIndex(1)))
}

export type LikeApiInput = ApiInputWithUser<{
  data: Comment
  createdAt: string
}>
