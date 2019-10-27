import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {CommentsInput} from '../../store/dynamodb/comments'

export async function list(store: MetadataStore, ep: EntityFactory, input: CommentsInput) {
  return store.comments(input)
}

export type ListInput = CommentsInput