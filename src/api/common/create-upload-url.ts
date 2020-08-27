import {MetadataStore} from '../../store/dynamodb/params/create'
import {ContentStore} from '../../store/s3'
import {logApiCommon as log} from '../../lib/log'

export function createUploadUrl(store: MetadataStore, cs: ContentStore, input: CreateUploadUrlApiInput) {
  log('createUploadUrl %j', input)

  // todo: user 검증이 없으므로 DDOS 가능성

  return cs.getUploadUrl(input.data)
}

export type CreateUploadUrlApiInput = Yiguana.ApiInputWithUser<{
  key: string
}>
