import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {YiguanaDocumentHash} from '../../../dynamodb'
import {UserApiInput} from '../../../type'
import {logApiUserReply} from '../../../lib/log'

export async function like(store: MetadataStore, ep: EntityFactory, input: LikeInput) {
  log('like %j', input)
  throw new Error('use comment instead of reply')
}

export type LikeInput = UserApiInput<YiguanaDocumentHash>

const log = logApiUserReply.extend('like')
