import {list, ListApiInput} from './list'
import {create, CreateApiInput} from './create'
import {del, DelApiInput} from './del'
import {view, ViewApiInput} from './view'
import {MetadataStore} from '../../store/dynamodb/params/create'
import {ContentStore} from '../../store/s3'

export class PostApi {
  constructor(private ms: MetadataStore, private cs: ContentStore) {
  }

  list(input: ListApiInput) {
    return list(this.ms, input)
  }

  create(input: CreateApiInput) {
    return create(this.ms, this.cs, input)
  }

  del(input: DelApiInput) {
    return del(this.ms, input)
  }

  view(input: ViewApiInput) {
    return view(this.ms, this.cs, input)
  }
}
