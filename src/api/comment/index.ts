import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {list, ListApiInput} from './list'
import {create, CreateApiInput} from './create'
import {update, UpdateApiInput} from './update'
import {del, DelApiInput} from './del'
import {read, ReadApiInput} from './read'
import {deprecate} from 'util'

export class CommentApi {
  constructor(private store: MetadataStore, private ef: EntityFactory) {
  }

  list(input: ListApiInput) {
    return list(this.store, this.ef, input)
  }

  create(input: CreateApiInput) {
    return create(this.store, this.ef, input)
  }

  read(input: ReadApiInput) {
    return read(this.store, this.ef, input)
  }

  // @deprecated
  update(input: UpdateApiInput) {
    return deprecate(update, 'use?')(this.store, this.ef, input)
  }

  del(input: DelApiInput) {
    return del(this.store, this.ef, input)
  }
}
