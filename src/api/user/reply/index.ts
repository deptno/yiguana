import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {ListInput, list} from './list'
import {LikeInput, like} from './like'
import {logApiUserReply} from '../../../lib/log'

export class UserReplyApi {
  constructor(private store: MetadataStore, private ef: EntityFactory) {
  }

  list(input: ListInput) {
    logApiUserReply('list', input)
    return list(this.store, this.ef, input)
  }

  like(input: LikeInput) {
    logApiUserReply('like', input)
    return like(this.store, this.ef, input)
  }
}
