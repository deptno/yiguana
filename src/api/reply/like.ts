import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {Member} from '../../entity/user'
import {EEntity} from '../../entity/enum'
import {Post} from '../../entity/post'
import {Comment} from '../../entity/comment'
import * as R from 'ramda'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeInput) {
  const {data, user} = input

  const likeInfos = await store.getLike({
    data: {
      targetId: data.hk,
      entity: EEntity.Reply,
    },
    user: user
  })
  console.log({likeInfos})
  const likeInfo = likeInfos.items[0]
  if (likeInfo !== undefined) {
    console.log('like already exists')
    return Promise
      .all([
        store.removeLike({data: likeInfo}),
        store.unlikeReply({data: data}),
      ])
      .then<Post>(R.view(R.lensIndex(1)))
  }

  const like = ep.createLike({
    data: {
      targetId: data.hk,
      entity: EEntity.Reply,
      createdAt: new Date().toISOString(),
    },
    user,
  })

  return Promise
    .all([
      store.addLike({data: like}),
      store.likeReply({data}),
    ])
    .then<Comment>(R.view(R.lensIndex(1)))
}

export type LikeInput = {
  data: YiguanaDocumentHash
  user: Member
}
