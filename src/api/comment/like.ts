import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function like(store: YiguanaStore, ep: EntityFactory, input: LikeInput) {
  return store.likeComment(input)
}

export type LikeInput = YiguanaDocumentHash
