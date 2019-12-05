import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {list, ListApiInput} from './list'
import {deprecate} from 'util'

export class UserReplyApi {
  constructor(private store: MetadataStore, private ef: EntityFactory) {
  }

  // @deprecated
  list(input: ListApiInput) {
    return deprecate(list, 'use?')(this.store, this.ef, input)
  }
}
