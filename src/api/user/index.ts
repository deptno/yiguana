import {MetadataStore} from '../../store/dynamodb'
import {UserPostApi} from './post'
import {UserCommentApi} from './comment'
import {UserReportApi} from './report'
import {get, GetApiInput} from './get'

export class UserApi {
  post = new UserPostApi(this.ms)
  comment = new UserCommentApi(this.ms)
  report = new UserReportApi(this.ms)

  constructor(private ms: MetadataStore) {
  }

  get<T extends Yiguana.Document>(input: GetApiInput) {
    return get<T>(this.ms, input)
  }
}

