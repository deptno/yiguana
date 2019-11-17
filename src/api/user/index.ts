import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {UserPostApi} from './post'
import {UserCommentApi} from './comment'
import {UserReplyApi} from './reply'
import {report, ReportInput} from './report'
import {logApiUser} from '../../lib/log'

export class UserApi {
  post = new UserPostApi(this.ms, this.ef)
  comment = new UserCommentApi(this.ms, this.ef)
  reply = new UserReplyApi(this.ms, this.ef)

  constructor(private ms: MetadataStore, private ef: EntityFactory) {
  }

  report(input: ReportInput) {
    logApiUser('report', input)
    return report(this.ms, this.ef, input)
  }
}

