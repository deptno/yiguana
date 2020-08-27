import {MetadataStore} from '../../store/dynamodb/params/create'
import {create, CreateApiInput} from './create'
import {deprecate} from 'util'

export class ReplyApi {
  constructor(private store: MetadataStore) {
  }

  // todo: CommentApi 로 옮긴후 Reply 는 실재 하지 않는 타입으로 ReplyApi 는 삭제한다.
  create(input: CreateApiInput) {
    return deprecate(create, 'check reply is using')(this.store, input)
  }
}
