import {MetadataStore} from '../../store/dynamodb'
import {ContentStore} from '../../store/s3'
import {EntityFactory} from '../../entity'
import {createUploadUrl, CreateUploadUrlInput} from './create-upload-url'

export class CommonApi {
  constructor(private ms: MetadataStore, private cs: ContentStore, private ef: EntityFactory) {
  }

  createUploadUrl(input: CreateUploadUrlInput) {
    return createUploadUrl(this.ms, this.cs, this.ef, input)
  }
}