import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {list, ListInput} from './list'
import {create, CreateInput} from './create'
import {update, UpdateInput} from './update'
import {del, DelInput} from './del'
import {read, ReadInput} from './read'
import {logApiComment} from '../../lib/log'

export class CommentApi {
  constructor(private store: MetadataStore, private ef: EntityFactory) {
  }

  list(input: ListInput) {
    logApiComment('list', input)
    return list(this.store, this.ef, input)
  }

  create(input: CreateInput) {
    logApiComment('create', input)
    return create(this.store, this.ef, input)
  }

  read(input: ReadInput) {
    logApiComment('read', input)
    return read(this.store, this.ef, input)
  }

  update(input: UpdateInput) {
    logApiComment('update', input)
    return update(this.store, this.ef, input)
  }

  del(input: DelInput) {
    logApiComment('del', input)
    return del(this.store, this.ef, input)
  }
}
