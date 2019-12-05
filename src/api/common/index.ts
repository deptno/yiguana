import {MetadataStore} from '../../store/dynamodb'
import {ContentStore} from '../../store/s3'
import {EntityFactory} from '../../entity'
import {createUploadUrl, CreateUploadUrlApiInput} from './create-upload-url'

export class CommonApi {
  constructor(private ms: MetadataStore, private cs: ContentStore, private ef: EntityFactory) {
  }

  createUploadUrl(input: CreateUploadUrlApiInput) {
    return createUploadUrl(this.ms, this.cs, this.ef, input)
  }
}