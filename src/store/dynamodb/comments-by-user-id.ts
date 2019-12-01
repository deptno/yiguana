import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Comment} from '../../entity/comment'
import {EIndexName} from '../../dynamodb/yiguana-index'
import {keys} from '../../dynamodb/keys'
import {EEntity} from '../../type'

export function commentsByUserId<T = Comment>(operator: DynamoDBInput, params: CommentsByUserIdInput) {
  const {tableName, dynamodb} = operator
  const {userId, exclusiveStartKey} = params

  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.byUser,
    KeyConditionExpression: '#h = :h AND begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#h': 'userId',
      '#r': 'byUser',
    },
    ExpressionAttributeValues: {
      ':h': userId,
      ':r': keys.byUser.comment.stringify({
        entity: EEntity.Comment,
      }),
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
  }
  return dynamodb.query<T>(queryParams)
}

export type CommentsByUserIdInput = {
  userId: string
  postId?: string
  exclusiveStartKey?: Exclude<any, string | number>
}
