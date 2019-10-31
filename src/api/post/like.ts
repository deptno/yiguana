import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {EEntity} from '../../entity/enum'
import {Member} from '../../entity/user'
import {Post} from '../../entity/post'
import * as R from 'ramda'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeInput) {
  const {data, user} = input
  if (!user) {
    throw new Error('user is required')
  }
  if (!('id' in user)) {
    throw new Error('user.id is required')
  }

  // like 가 이미 존재할 시 에는 unlike 가 동작해야한다.
  /* FIXME:
   *  getLike 시와 createLike 시에 input이 같으니 이를 공통으로 빼려고 했는데
   *  incompatible이랑 entity 관련 에러로 처리 못함...
   */
  const {items} = await store.getLike({
    data: {
      targetId: data.hk,
      entity: EEntity.Post,
    },
    user: user
  })
  console.log(items.length)

  const [likeInfo] = items
  if (likeInfo) {
    console.log(JSON.stringify({likeInfo}, null, 2))
    console.log('like already exists')
    return Promise
      .all([
        store.removeLike({data: likeInfo}),
        store.unlikePost({data: data}),
      ])
      .then<Post>(R.view(R.lensIndex(1)))
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
  user: Member
}
