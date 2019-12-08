import {S3Input} from '../../entity/input/s3'
import {getPostContentUnSafe, GetPostContentUnSafeInput} from './get-post-content'
import {createPostContentUnSafe, CreatePostContentUnSafeInput} from './create-post-content'
import {logStoreS3} from '../../lib/log'
import {getUploadUrl, GetUploadUrlInput} from './get-upload-url'
import {ContentStoreOption} from '../../type'

export class ContentStore {
  constructor(private operator: S3Input, private option: ContentStoreOption) {

  }

  create(input: CreatePostContentUnSafeInput) {
    logStoreS3('create', input)
    return createPostContentUnSafe(this.operator, input)
  }

  read(input: GetPostContentUnSafeInput) {
    logStoreS3('read', input)
    return getPostContentUnSafe(this.operator, input)
  }

  getUploadUrl(input: GetUploadUrlInput) {
    logStoreS3('getUploadUrl', input)
    return getUploadUrl(this.operator, this.option, input)
  }
}

