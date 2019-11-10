import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {ListInput, list} from './list'
import {LikeInput, like} from './like'
import {UnlikeInput, unlike} from './unlike'

export class UserPostApi {
  constructor(private store: MetadataStore, private ef: EntityFactory) {
  }

  list(input: ListInput) {
    return list(this.store, this.ef, input)
  }

  like(input: LikeInput) {
    return like(this.store, this.ef, input)
  }

  unlike(input: UnlikeInput) {
    return unlike(this.store, this.ef, input)
  }
}
