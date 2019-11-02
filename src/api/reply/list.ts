import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {RepliesInput} from '../../store/dynamodb/replies'

export async function list(store: MetadataStore, ep: EntityFactory, input: ListInput) {
  return store.replies(input)
}

export type ListInput = RepliesInput & {
  userId?: string
}
