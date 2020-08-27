import {MetadataStore} from '../../store/dynamodb/params/create'
import {ContentStore} from '../../store/s3'
import {createUploadUrl, CreateUploadUrlApiInput} from './create-upload-url'

export class CommonApi {
  constructor(private ms: MetadataStore, private cs: ContentStore) {
  }

  createUploadUrl(input: CreateUploadUrlApiInput) {
    return createUploadUrl(this.ms, this.cs, input)
  }
}