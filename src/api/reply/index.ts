import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {create, CreateApiInput} from './create'
import {deprecate} from 'util'

export class ReplyApi {
  constructor(private store: MetadataStore, private ef: EntityFactory) {
  }

  // @deprecated
  create(input: CreateApiInput) {
    return deprecate(create, 'check reply is using')(this.store, this.ef, input)
  }
}
