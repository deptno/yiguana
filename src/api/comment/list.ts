import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {CommentsInput} from '../../store/dynamodb/comments'

export async function list(store: YiguanaStore<Post>, ep: EntityFactory, input: CommentsInput) {
  return store.comments(input)
}
