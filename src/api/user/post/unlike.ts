import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {ApiInput, YiguanaDocumentHash} from '../../../type'
import {logApiUserPost} from '../../../lib/log'

export async function unlike(store: MetadataStore, ep: EntityFactory, input: UnlikeInput) {
  log('unlike %j', input)
  return store.unlikePost({
    data: input.data,
  })
}

export type UnlikeInput = ApiInput<YiguanaDocumentHash>

const log = logApiUserPost.extend('unlike')
