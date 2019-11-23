import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {YiguanaDocumentHash} from '../../../dynamodb/yiguana-document'
import {ApiInput} from '../../../type'
import {logApiUserPost} from '../../../lib/log'

export async function unlike(store: MetadataStore, ep: EntityFactory, input: UnlikeInput) {
  log('unlike %j', input)
  return store.unlikePost({
    data: input.data,
  })
}

export type UnlikeInput = ApiInput<YiguanaDocumentHash>

const log = logApiUserPost.extend('unlike')
