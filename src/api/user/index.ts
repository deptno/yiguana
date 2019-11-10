import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {UserPostApi} from './post'
import {UserCommentApi} from './comment'
import {UserReplyApi} from './reply'

export class UserApi {
  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  // FIXME: UserPostApi, UserCommentApi, UserReplyApi 다 가져와야 하고 ms, ef는 어떻게 넘기지
  post: UserPostApi
  comment: UserCommentApi
  reply: UserReplyApi
}
