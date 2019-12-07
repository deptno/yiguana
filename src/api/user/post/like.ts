import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory, Post} from '../../../entity'
import * as R from 'ramda'
import {ApiInputWithUser} from '../../../type'
import {logApiUserPost as log} from '../../../lib/log'
import {assertsMember} from '../../../lib/assert'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeApiInput) {
  log('like %j', input)

  assertsMember(input.user)

  const {data: {data, createdAt}, user} = input
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
    log('like +1', like)
    return store.incLikes(data)
  }
  log('like -1', like)

  return Promise
    .all([
      store.removeLike({data, userId: user.id}),
      store.decLikes(data),
    ])
    .then<Post>(R.view(R.lensIndex(1)))
}

export type LikeApiInput = ApiInputWithUser<{
  data: Post
  createdAt: string
}>
