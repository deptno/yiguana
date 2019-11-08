import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {Member} from '../../entity/user'
import {EEntity} from '../../entity/enum'
import {Reply} from '../../entity/reply'
import * as R from 'ramda'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeInput) {
  const {data, user} = input
  console.log(1)
  const likeInfo = await store.getLike({
    data: {
      targetId: data.hk,
    },
    user: user
  })
  console.log(2)
  if (likeInfo !== undefined) {
    console.log('like already exists')
    return Promise
      .all([
        store.removeLike({data: likeInfo}),
        store.unlikeReply({data: data}),
      ])
      .then<Reply>(R.view(R.lensIndex(1)))
  }

  const like = ep.createLike({
    data: {
      targetId: data.hk,
      entity: EEntity.Comment,
      createdAt: new Date().toISOString(),
    },
    user,
  })

  return Promise
    .all([
      store.addLike({data: like}),
      store.likeReply({data}),
    ])
    .then<Reply>(R.view(R.lensIndex(1)))
}

export type LikeInput = {
  data: YiguanaDocumentHash
  user: Member
}
