import {MetadataStore} from '../../store/dynamodb'
import {list, ListApiInput} from './list'
import {create, CreateApiInput} from './create'
import {update, UpdateApiInput} from './update'
import {del, DelApiInput} from './del'
import {read, ReadApiInput} from './read'
import {deprecate} from 'util'

export class CommentApi {
  constructor(private store: MetadataStore) {
  }

  list(input: ListApiInput) {
    return list(this.store, input)
  }

  create(input: CreateApiInput) {
    return create(this.store, input)
  }

  read(input: ReadApiInput) {
    return read(this.store, input)
  }

  // @deprecated
  update(input: UpdateApiInput) {
    return deprecate(update, 'use?')(this.store, input)
  }

  del(input: DelApiInput) {
    return del(this.store, input)
  }
}
