import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {EEntity} from '../../entity/enum'
import {Member} from '../../entity/user'
import {Comment} from '../../entity/comment'
import * as R from 'ramda'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeInput) {
  const {data, user} = input
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
      store.likeComment({data}),
    ])
    .then<Comment>(R.view(R.lensIndex(1)))
}

export type LikeInput = {
  data: YiguanaDocumentHash
  user: Member
}
