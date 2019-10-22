import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function del(store: YiguanaStore, ep: EntityFactory, input: DelInput) {
  return store.removeComment(input.data)
}

export type DelInput = {
  data: YiguanaDocumentHash
}
