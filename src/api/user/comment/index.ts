import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {list, ListInput} from './list'
import {like, LikeInput} from './like'
import {logApiUserComment} from '../../../lib/log'

export class UserCommentApi {
  constructor(private store: MetadataStore, private ef: EntityFactory) {
  }

  list(input: ListInput) {
    logApiUserComment('list', input)
    return list(this.store, this.ef, input)
  }

  like(input: LikeInput) {
    logApiUserComment('like', input)
    return like(this.store, this.ef, input)
  }
}
