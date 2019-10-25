import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {PostInput} from '../../store/dynamodb/post'

export async function read(store: YiguanaStore, ep: EntityFactory, input: PostInput) {
  return store.post(input)
}
