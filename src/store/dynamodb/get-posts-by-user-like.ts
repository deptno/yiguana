import {Post} from '..//post'
import {_likesByUser, QueryByUserLike} from './_likes-by-user'
import {logStoreDdb} from '../../lib/log'

export function getPostsByUserLike(operator: {dynamodb, tableName}, input: PostsByUserLikeInput) {
  logStoreDdb('getPostsByUserLike input %j', input)

  return _likesByUser<Post>(operator, {...input, entity: Yiguana.EntityType.Post})
    .then(response => {
      return {
        ...response,
        items: response.items.map(t => t.data as Post),
      }
    })
}
export type PostsByUserLikeInput = Omit<QueryByUserLike<Yiguana.EntityType.Post>, 'entity'> & {limit?: number}
