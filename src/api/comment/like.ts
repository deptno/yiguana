import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {Member} from '../../entity/user'
import {Comment} from '../../entity/comment'
import * as R from 'ramda'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeInput) {
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
    await store.likeComment({data: data})

    return like
  }
  console.log('like - 1', like, data)

  return Promise
    .all([
      store.removeLike({data, userId: user.id}),
      store.unlikeComment({data}),
    ])
    .then<Comment>(R.view(R.lensIndex(1)))
}

export type LikeInput = {
  data: {
    data: Comment
    createdAt: string
  }
  user: Member
}
