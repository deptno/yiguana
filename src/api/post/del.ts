import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function del(store: YiguanaStore, ep: EntityFactory, input: DelInput): Promise<boolean> {
  return store.removePost({hk: input.data.hk})
}

export type DelInput = {
  data: YiguanaDocumentHash
}
