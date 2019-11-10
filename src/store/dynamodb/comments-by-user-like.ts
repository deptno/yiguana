import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {Comment} from '../../entity/comment'
import {_likesByUser, QueryByUserLike} from './_likes-by-user'

export function commentsByUserLike(operator: DynamoDBInput, params: CommentsByUserLikeInput) {
  return _likesByUser<Comment>(operator, {...params, entity: EEntity.Comment})
    .then(response => {
      return {
        ...response,
        items: response.items.map(t => t.data as Comment)
      }
    })
}
export type CommentsByUserLikeInput = Omit<QueryByUserLike<EEntity.Comment>, 'entity'>
