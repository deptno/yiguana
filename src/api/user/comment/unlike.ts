import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {YiguanaDocumentHash} from '../../../dynamodb/yiguana-document'
import {ApiInput} from '../../../type'
import {logApiUserComment} from '../../../lib/log'

export async function unlike(store: MetadataStore, ep: EntityFactory, input: UnlikeInput) {
  log('unlike %j', input)
  return store.unlikeComment({
    data: input.data,
  })
}

export type UnlikeInput = ApiInput<YiguanaDocumentHash>

const log = logApiUserComment.extend('unlike')
