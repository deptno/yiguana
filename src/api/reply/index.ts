import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {list, ListInput} from './list'
import {create, CreateInput} from './create'
import {update, UpdateInput} from './update'
import {del, DelInput} from './del'
import {view, ViewInput} from './view'

export function createReplyApi(store: MetadataStore, ef: EntityFactory) {
  return new ReplyApi(store, ef)
}

export class ReplyApi {
  constructor(private store: MetadataStore, private ef: EntityFactory) {
  }

  list(input: ListInput) {
    return list(this.store, this.ef, input)
  }

  create(input: CreateInput) {
    return create(this.store, this.ef, input)
  }

//  read(input: ReadInput) {
//    return read(this.store, this.ep, input)
//  }

  update(input: UpdateInput) {
    return update(this.store, this.ef, input)
  }

  del(input: DelInput) {
    return del(this.store, this.ef, input)
  }

  view(input: ViewInput) {
    return view(this.store, this.ef, input)
  }
}
