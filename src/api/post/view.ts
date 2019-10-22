import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function view(store: YiguanaStore, ep: EntityFactory, input: ViewInput) {
  return store.viewPost({
    data: input.data
  })
}

export type ViewInput = {
  data: YiguanaDocumentHash
}
