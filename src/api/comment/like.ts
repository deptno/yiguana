import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {EEntity} from '../../entity/enum'
import {Member} from '../../entity/user'
import {Comment} from '../../entity/comment'
import * as R from 'ramda'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeInput) {
  // TODO: 미구현
  throw new Error('todo')
}

export type LikeInput = {
  data: YiguanaDocumentHash
  user: Member
}
