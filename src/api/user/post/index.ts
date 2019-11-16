import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {list, ListInput} from './list'
import {like, LikeInput} from './like'
import {unlike, UnlikeInput} from './unlike'
import {report, ReportInput} from './report'

export class UserPostApi {
  constructor(private store: MetadataStore, private ef: EntityFactory) {
  }

  list(input: ListInput) {
    return list(this.store, this.ef, input)
  }

  like(input: LikeInput) {
    return like(this.store, this.ef, input)
  }

  // FIXME: api 레벨에서는 like 가 토글로 사용되어 필요없을 수 있다.
  // @deprecated
  unlike(input: UnlikeInput) {
    return unlike(this.store, this.ef, input)
  }

  report(input: ReportInput) {
    return report(this.store, this.ef, input)
  }
}
