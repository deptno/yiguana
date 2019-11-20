import {EntityFactory} from '../../entity'
import {list, ListInput} from './list'
import {create, CreateInput} from './create'
import {read, ReadInput} from './read'
import {update, UpdateInput} from './update'
import {del, DelInput} from './del'
import {view, ViewInput} from './view'
import {MetadataStore} from '../../store/dynamodb'
import {ContentStore} from '../../store/s3'
import {logApiPost} from '../../lib/log'

export class PostApi {
  constructor(private ms: MetadataStore, private cs: ContentStore, private ef: EntityFactory) {
  }

  list(input: ListInput) {
    logApiPost('list', input)
    return list(this.ms, this.ef, input)
  }

  create(input: CreateInput) {
    logApiPost('create', input)
    return create(this.ms, this.cs, this.ef, input)
  }

  // 실제로는 read 대신 view 가 사용된다 read 는 사용되지 않거나 alias 로 동작 해야 될 것으로 보임
  // @deprecated
  read(input: ReadInput) {
    logApiPost('read', input)
    return read(this.ms, this.ef, input)
  }

  update(input: UpdateInput) {
    logApiPost('update', input)
    return update(this.ms, this.ef, input)
  }

  del(input: DelInput) {
    logApiPost('del', input)
    return del(this.ms, this.ef, input)
  }

  view(input: ViewInput) {
    logApiPost('view', input)
    return view(this.ms, this.cs, this.ef, input)
  }
}
