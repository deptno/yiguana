import {_likesByUser, QueryByUserLike} from '../create/_likes-by-user'
import {logStoreDdb} from '../../../../lib/log'

export function getCommentsByUserLike(operator: {dynamodb, tableName}, input: CommentsByUserLikeInput) {
  logStoreDdb('getCommentsByUserLike input %j', input)

  return _likesByUser<Comment>(operator, {...input, entity: Yiguana.EntityType.Comment})
    .then(response => {
      return {
        ...response,
        items: response.items.map(t => t.data as Comment)
      }
    })
}
export type CommentsByUserLikeInput = Omit<QueryByUserLike<Yiguana.EntityType.Comment>, 'entity'> & {limit?: number}
