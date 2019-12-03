import {EntityFactory} from '../../entity'
import {list, ListApiInput} from './list'
import {create, CreateApiInput} from './create'
import {read, ReadApiInput} from './read'
import {del, DelApiInput} from './del'
import {view, ViewApiInput} from './view'
import {MetadataStore} from '../../store/dynamodb'
import {ContentStore} from '../../store/s3'
import {deprecate} from 'util'

export class PostApi {
  constructor(private ms: MetadataStore, private cs: ContentStore, private ef: EntityFactory) {
  }

  list(input: ListApiInput) {
    return list(this.ms, this.ef, input)
  }

  create(input: CreateApiInput) {
    return create(this.ms, this.cs, this.ef, input)
  }

  // @deprecated
  read(input: ReadApiInput) {
    return deprecate(read, 'is it need?')(this.ms, this.ef, input)
  }

  del(input: DelApiInput) {
    return del(this.ms, this.ef, input)
  }

  view(input: ViewApiInput) {
    return view(this.ms, this.cs, this.ef, input)
  }
}
