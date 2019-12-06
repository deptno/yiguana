import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Comment} from '../../entity/comment'
import {_likesByUser, QueryByUserLike} from './_likes-by-user'
import {EEntity} from '../../type'

export function getCommentsByUserLike(operator: DynamoDBInput, params: CommentsByUserLikeInput) {
  return _likesByUser<Comment>(operator, {...params, entity: EEntity.Comment})
    .then(response => {
      return {
        ...response,
        items: response.items.map(t => t.data as Comment)
      }
    })
}
export type CommentsByUserLikeInput = Omit<QueryByUserLike<EEntity.Comment>, 'entity'> & {limit?: number}
