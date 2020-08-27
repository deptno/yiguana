import {MetadataStore} from '../../../store/dynamodb'
import {list, ListApiInput} from './list'
import {like, LikeApiInput} from './like'

export class UserPostApi {
  constructor(private store: MetadataStore) {
  }

  list(input: ListApiInput) {
    return list(this.store, input)
  }

  like(input: LikeApiInput) {
    return like(this.store, input)
  }
}
