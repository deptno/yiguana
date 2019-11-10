import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {Comment} from '../../entity/comment'
import {_queryByUserLike, QueryByUserLike} from './_query-by-user-like'

export function commentsByUserLike(operator: DynamoDBInput, params: CommentsByUserLikeInput) {
  return _queryByUserLike<Comment>(operator, {
    ...params,
    entity: EEntity.Comment
  })
}
export type CommentsByUserLikeInput = Omit<QueryByUserLike<EEntity.Comment>, 'entity'>
