import {MetadataStore} from '../../../store/dynamodb'
import {Comment, EntityFactory, Reply} from '../../../entity'
import * as R from 'ramda'
import {ApiInputWithUser} from '../../../type'
import {logApiUserComment as log} from '../../../lib/log'
import {assertsMember} from '../../../lib/assert'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeApiInput) {
  log('like %j', input)

  assertsMember(input.user)

  const {user} = input
  const {data, createdAt} = input.data
  const liked = await store.addLike(ep.createLike({
    user,
    data: {
      data,
      createdAt,
    },
  }))

  if (liked) {
    return store.incLikes(data)
  }

  // todo 이런 로직은 스토어 쪽으로 내리는 걸 고려
  return Promise
    .all([
      store.removeLike({
        data,
        userId: user.id,
      }),
      store.decLikes(data),
    ])
    .then<Comment>(R.view(R.lensIndex(1)))
}

export type LikeApiInput = ApiInputWithUser<{
  data: Comment | Reply
  createdAt: string
}>
