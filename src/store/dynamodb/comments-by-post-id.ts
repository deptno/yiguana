import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Comment} from '../../entity/comment'
import {EEntity} from '../../entity/enum'
import {EIndexName} from '../../dynamodb/yiguana-index'

export function commentsByPostId<T = Comment>(operator: DynamoDBInput, params: CommentsByPostIdInput) {
  const {tableName, dynamodb} = operator
  const {postId, nextToken} = params

  // todo
  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.CommentsByPriorityCreated,
    KeyConditionExpression: '#h = :h',
    ExpressionAttributeNames: {
      '#h': 'postId',
    },
    ExpressionAttributeValues: {
      ':h': postId,
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
  }
  return dynamodb.query<T>(queryParams)
}

export type CommentsByPostIdInput = {
  postId: string
  nextToken?: string
}
