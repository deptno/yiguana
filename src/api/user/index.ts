import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {UserPostApi} from './post'
import {UserCommentApi} from './comment'
import {UserReplyApi} from './reply'

export class UserApi {
  post = new UserPostApi(this.ms, this.ef)
  comment = new UserCommentApi(this.ms, this.ef)
  reply = new UserReplyApi(this.ms, this.ef)

  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }
}

