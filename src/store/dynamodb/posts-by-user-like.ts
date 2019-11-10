import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import {EEntity} from '../../entity/enum'
import {_queryByUserLike, QueryByUserLike} from './_query-by-user-like'

export function postsByUserLike(operator: DynamoDBInput, params: PostsByUserLikeInput) {
  return _queryByUserLike<Post>(operator, {
    ...params,
    entity: EEntity.Post
  })
}
export type PostsByUserLikeInput = Omit<QueryByUserLike<EEntity.Post>, 'entity'>
