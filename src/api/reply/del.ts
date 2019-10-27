import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function del(store: MetadataStore, ep: EntityFactory, input: DelInput) {
  return store.removeReply(input)
}

export type DelInput = YiguanaDocumentHash
