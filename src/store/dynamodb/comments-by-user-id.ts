import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EIndexName} from '../../entity/dynamodb/enum'
import {Comment} from '../../entity/Comment'
import {EEntity} from '../../entity/enum'

export function commentsByUserId<T = Comment>(operator: DynamoDBInput, params: CommentsByUserIdInput) {
  const {tableName, dynamodb} = operator
  const {userId, nextToken} = params

  // todo
  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.ByUser,
    KeyConditionExpression: '#h = :h AND begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#h': 'userId',
      '#r': 'order',
    },
    ExpressionAttributeValues: {
      ':h': userId,
      ':r': EEntity.Comment
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
