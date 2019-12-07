import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import {_likesByUser, QueryByUserLike} from './_likes-by-user'
import {EEntity} from '../../type'
import {logStoreDdb} from '../../lib/log'

export function getPostsByUserLike(operator: DynamoDBInput, input: PostsByUserLikeInput) {
  logStoreDdb('getPostsByUserLike input %j', input)

  return _likesByUser<Post>(operator, {...input, entity: EEntity.Post})
    .then(response => {
      return {
        ...response,
        items: response.items.map(t => t.data as Post),
      }
    })
}
export type PostsByUserLikeInput = Omit<QueryByUserLike<EEntity.Post>, 'entity'> & {limit?: number}
