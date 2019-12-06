import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import {_likesByUser, QueryByUserLike} from './_likes-by-user'
import {EEntity} from '../../type'

export function getPostsByUserLike(operator: DynamoDBInput, params: PostsByUserLikeInput) {
  return _likesByUser<Post>(operator, {...params, entity: EEntity.Post})
    .then(response => {
      return {
        ...response,
        items: response.items.map(t => t.data as Post),
      }
    })
}
export type PostsByUserLikeInput = Omit<QueryByUserLike<EEntity.Post>, 'entity'> & {limit?: number}
