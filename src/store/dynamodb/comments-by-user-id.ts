import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EIndexName} from '../../entity/dynamodb/enum'
import {Comment} from '../../entity/Comment'

export function commentsByUserId<T = Comment>(operator: DynamoDBInput, params: CommentsByUserIdInput) {
  const {tableName, dynamodb} = operator
  const {userId, postId, nextToken} = params

  // todo
  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.UserOrder,
    KeyConditionExpression: '#p = :p',
    ExpressionAttributeNames: {
      '#p': 'userId',
    },
    ExpressionAttributeValues: {
      ':p': userId,
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
  }
  return dynamodb.query<T>(queryParams)
}

export type CommentsByUserIdInput = {
  userId: string
  postId?: string
  nextToken?: string
}
