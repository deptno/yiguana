import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {LikePostInput} from '../../store/dynamodb/like-post'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function like(store: YiguanaStore, ep: EntityFactory, input: LikeInput) {
  return store.likePost({data: input.data})
}

export type LikeInput = {
  data: YiguanaDocumentHash
}
