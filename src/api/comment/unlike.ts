import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function unlike(store: YiguanaStore, ep: EntityFactory, input: UnlikeInput) {
  return store.unlikeComment(input)
}

export type UnlikeInput = YiguanaDocumentHash
