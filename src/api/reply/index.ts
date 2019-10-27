import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {like, LikeInput} from './like'
import {list, ListInput} from './list'
import {create, CreateInput} from './create'
import {update, UpdateInput} from './update'
import {del, DelInput} from './del'
import {view, ViewInput} from './view'

export function createReplyApi(store: MetadataStore, ep: EntityFactory) {
  return new ReplyApi(store, ep)
}

export class ReplyApi {
  constructor(private store: MetadataStore, private ep: EntityFactory) {
  }

  list(input: ListInput) {
    return list(this.store, this.ep, input)
  }

  create(input: CreateInput) {
    return create(this.store, this.ep, input)
  }

//  read(input: ReadInput) {
//    return read(this.store, this.ep, input)
//  }

  update(input: UpdateInput) {
    return update(this.store, this.ep, input)
  }

  del(input: DelInput) {
    return del(this.store, this.ep, input)
  }

  like(input: LikeInput) {
    return like(this.store, this.ep, input)
  }

//  unlike(input: UnlikeInput) {
//    return unlike(this.store, this.ep, input)
//  }

  view(input: ViewInput) {
    return view(this.store, this.ep, input)
  }
}
