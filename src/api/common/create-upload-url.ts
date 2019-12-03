import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {ContentStore} from '../../store/s3'
import {ApiInputWithUser} from '../../type'
import {assertsMemberOrNot} from '../../lib/assert'
import {logApiCommon as log} from '../../lib/log'

export function createUploadUrl(store: MetadataStore, cs: ContentStore, ef: EntityFactory, input: CreateUploadUrlApiInput) {
  log('createUploadUrl %j', input)

  assertsMemberOrNot(input.user)

  return cs.getUploadUrl(input.data)
}

export type CreateUploadUrlApiInput = ApiInputWithUser<{
  key: string
}>
