import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function like(store: YiguanaStore, ep: EntityFactory, input: LikeInput) {
  return store.likePost({data: input.data})
}

export type LikeInput = {
  data: YiguanaDocumentHash
}
