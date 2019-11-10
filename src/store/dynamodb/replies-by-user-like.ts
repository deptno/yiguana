import {DynamoDBInput} from '../../entity/input/dynamodb'

// TODO: delete, use commentsByUserLike instead
export function repliesByUserLike<T = Comment>(operator: DynamoDBInput, params: RepliesByUserLikeInput) {
  throw new Error('use commentsByUserLike instead')
}
export type RepliesByUserLikeInput = {}
