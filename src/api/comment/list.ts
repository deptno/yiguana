import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {CommentsInput} from '../../store/dynamodb/comments'

export async function list(store: YiguanaStore<Comment>, ep: EntityFactory, input: CommentsInput) {
  return store.comments(input)
}

export type ListInput = CommentsInput