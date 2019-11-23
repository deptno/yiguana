import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {ContentStore} from '../../store/s3'

export function createUploadUrl(store: MetadataStore, cs: ContentStore, ef: EntityFactory, input: CreateUploadUrlInput) {
  return cs.getUploadUrl(input)
}

export type CreateUploadUrlInput = {
  key: string
}
