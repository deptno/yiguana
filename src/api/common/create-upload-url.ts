import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {ContentStore} from '../../store/s3'
import {ApiInputWithUser} from '../../type'
import {logApiCommon as log} from '../../lib/log'

export function createUploadUrl(store: MetadataStore, cs: ContentStore, ef: EntityFactory, input: CreateUploadUrlApiInput) {
  log('createUploadUrl %j', input)

  // todo: user 검증이 없으므로 DDOS 가능성

  return cs.getUploadUrl(input.data)
}

export type CreateUploadUrlApiInput = ApiInputWithUser<{
  key: string
}>
