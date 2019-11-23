import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {Post} from '../../../entity/post'
import * as R from 'ramda'
import {LikePostApiInput} from '../../../type'
import {logApiUserPost} from '../../../lib/log'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeInput) {
  log('like %j', input)

  const {data: {data, createdAt}, user} = input
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
    console.log('like + 1', like)
    return store.likePost({data: data})
  }
  console.log('like - 1', like, data)

  return Promise
    .all([
      store.removeLike({data, userId: user.id}),
      store.unlikePost({data}),
    ])
    .then<Post>(R.view(R.lensIndex(1)))
}

export type LikeInput = LikePostApiInput

const log = logApiUserPost.extend('like')
