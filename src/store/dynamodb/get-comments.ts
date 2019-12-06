import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Comment} from '../../entity/comment'
import {EIndexName} from '../../type'

export function getComments<T = Comment>(operator: DynamoDBInput, params: CommentsInput) {
  const {tableName, dynamodb} = operator
  const {postId, exclusiveStartKey, limit = 10} = params

  return dynamodb.query<T>({
    TableName: tableName,
    IndexName: EIndexName.comments,
    KeyConditionExpression: '#p = :p',
    ExpressionAttributeNames: {
      '#p': 'postId',
    },
    ExpressionAttributeValues: {
      ':p': postId,
    },
    Limit: limit,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
  })
}

export type CommentsInput = {
  postId: string
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
}
