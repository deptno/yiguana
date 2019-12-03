import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {list, ListApiInput} from './list'
import {like, LikeApiInput} from './like'

export class UserPostApi {
  constructor(private store: MetadataStore, private ef: EntityFactory) {
  }

  list(input: ListApiInput) {
    return list(this.store, this.ef, input)
  }

  like(input: LikeApiInput) {
    return like(this.store, this.ef, input)
  }
}
