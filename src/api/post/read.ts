import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function read(store: YiguanaStore, ep: EntityFactory, input: ReadInput) {
  return store.post({
    hk: input.data.hk
  })
}

export type ReadInput = {
  data: YiguanaDocumentHash
}
