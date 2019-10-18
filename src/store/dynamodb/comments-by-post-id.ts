import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EIndexName} from '../../entity/dynamodb/enum'
import {Comment} from '../../entity/comment'
import {EEntity} from '../../entity/enum'

export function commentsByPostId<T = Comment>(operator: DynamoDBInput, params: CommentsByPostIdInput) {
  const {tableName, dynamodb} = operator
  const {postId, nextToken} = params

  // todo
  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.PostOrder,
    KeyConditionExpression: '#h = :h AND begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#h': 'postId',
      '#r': 'order',
    },
    ExpressionAttributeValues: {
      ':h': postId,
      ':r': EEntity.Comment
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
