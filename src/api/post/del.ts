import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {User} from '../../entity/user'

export async function del(store: MetadataStore, ep: EntityFactory, input: DelInput): Promise<boolean> {
  return store.removePost({hk: input.data.hk})
}

export type DelInput = {
  data: YiguanaDocumentHash
  user: User
}
