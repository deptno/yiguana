import {S3Input} from '../../entity/input/s3'
import {getPostContentUnSafe, GetPostContentUnSafeInput} from './get-post-content'
import {createPostContentUnSafe, CreatePostContentUnSafeInput} from './create-post-content'

export class ContentStore {
  constructor(private operator: S3Input) {

  }
  create(input : CreatePostContentUnSafeInput) {
    return createPostContentUnSafe(this.operator, input)
  }
  read(input : GetPostContentUnSafeInput) {
    return getPostContentUnSafe(this.operator, input)
  }
}
