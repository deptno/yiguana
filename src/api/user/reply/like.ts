import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {YiguanaDocumentHash} from '../../../dynamodb'
import {Member} from '../../../entity/user'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeInput) {
  throw new Error('use comment instead of reply')
}

export type LikeInput = {
  data: YiguanaDocumentHash
  user: Member
}
