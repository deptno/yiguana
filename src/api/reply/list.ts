import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {RepliesInput} from '../../store/dynamodb/replies'

export async function list(store: YiguanaStore, ep: EntityFactory, input: ListInput) {
  return store.replies(input)
}

export type ListInput = RepliesInput
