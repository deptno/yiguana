import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {list, ListInput} from './list'
import {create, CreateInput} from './create'
import {update, UpdateInput} from './update'
import {del, DelInput} from './del'
import {logApiReply} from '../../lib/log'

export class ReplyApi {
  constructor(private store: MetadataStore, private ef: EntityFactory) {
  }

  // @deprecated
  list(input: ListInput) {
    logApiReply('list', input)
    return list(this.store, this.ef, input)
  }

  create(input: CreateInput) {
    logApiReply('create', input)
    return create(this.store, this.ef, input)
  }

  update(input: UpdateInput) {
    logApiReply('update', input)
    return update(this.store, this.ef, input)
  }

  del(input: DelInput) {
    logApiReply('del', input)
    return del(this.store, this.ef, input)
  }
}
