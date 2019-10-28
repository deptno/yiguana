import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {EEntity} from '../../entity/enum'
import {User} from '../../entity/user'
import {Post} from '../../entity/post'
import * as R from 'ramda'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeInput) {
  // FIXME: like 가 이미 존재할 시 에는 unlike 가 동작해야한다.
  const {data, user} = input

  if (!user) {
    throw new Error('user is required')
  }
  if (!('userId' in user)) {
    throw new Error('user.userId is required')
  }

  const like = ep.createLike({
    data: {
      targetId: data.hk,
      entity: EEntity.Post,
      createdAt: new Date().toISOString(),
    },
    user,
  })

  return Promise
    .all([
      store.addLike({data: like}),
      store.likePost({data: data}),
    ])
    .then<Post>(R.view(R.lensIndex(1)))
}

export type LikeInput = {
  data: YiguanaDocumentHash
  user: User
}
