import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {PostInput} from '../../store/dynamodb/post'

export async function read(store: MetadataStore, ep: EntityFactory, input: PostInput) {
  return store.post(input)
}
