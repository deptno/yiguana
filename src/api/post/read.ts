import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function read(store: MetadataStore, ep: EntityFactory, input: ReadInput) {
  return store.post(input.data)
}

export type ReadInput = {
  data: YiguanaDocumentHash
}
