import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {UserPostApi} from './post'
import {UserCommentApi} from './comment'
import {UserReplyApi} from './reply'
import {UserReportApi} from './report'
import {YiguanaDocument} from '../../type'
import {get, GetApiInput} from './get'

export class UserApi {
  post = new UserPostApi(this.ms, this.ef)
  comment = new UserCommentApi(this.ms, this.ef)
  reply = new UserReplyApi(this.ms, this.ef)
  report = new UserReportApi(this.ms, this.ef)

  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  get<T extends YiguanaDocument>(input: GetApiInput) {
    return get<T>(this.ms, this.ef, input)
  }
}

