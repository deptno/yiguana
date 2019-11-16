import {S3Input} from '../../entity/input/s3'
import {getPostContentUnSafe, GetPostContentUnSafeInput} from './get-post-content'
import {createPostContentUnSafe, CreatePostContentUnSafeInput} from './create-post-content'
import {logStoreS3} from '../../lib/log'

export class ContentStore {
  constructor(private operator: S3Input) {

  }

  create(input: CreatePostContentUnSafeInput) {
    logStoreS3('create', input)
    return createPostContentUnSafe(this.operator, input)
  }

  read(input: GetPostContentUnSafeInput) {
    logStoreS3('read', input)
    return getPostContentUnSafe(this.operator, input)
  }
}
