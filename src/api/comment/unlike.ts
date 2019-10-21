import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {UnlikeCommentInput} from '../../store/dynamodb/unlike-comment'

export async function unlike(store: YiguanaStore<Post>, ep: EntityFactory, input: UnlikeCommentInput) {
  return store.unlikeComment(input)
}
