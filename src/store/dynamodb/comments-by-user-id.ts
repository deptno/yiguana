import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Comment} from '../../entity/comment'
import {EEntity} from '../../entity/enum'
import {EIndexName} from '../../dynamodb/yiguana-index'
import {keys} from '../../dynamodb/keys'

export function commentsByUserId<T = Comment>(operator: DynamoDBInput, params: CommentsByUserIdInput) {
  const {tableName, dynamodb} = operator
  const {userId, exclusiveStartKey} = params

  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.ByUser,
    KeyConditionExpression: '#h = :h',
    ExpressionAttributeNames: {
      '#h': 'userId',
      '#r': 'rk',
    },
    ExpressionAttributeValues: {
      ':h': userId,
      ':r': EEntity.Comment,
    },
    FilterExpression: '#r = :r',
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey
  }
  return dynamodb.query<T>(queryParams)
}

export type CommentsByUserIdInput = {
  userId: string
  postId?: string
  exclusiveStartKey?: Exclude<any, string | number>
}
