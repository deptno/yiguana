import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Comment} from '../../entity/comment'
import {EIndexName} from '../../dynamodb/yiguana-index'

export function comments<T = Comment>(operator: DynamoDBInput, params: CommentsInput) {
  const {tableName, dynamodb} = operator
  const {postId, exclusiveStartKey} = params

  return dynamodb.query<T>({
    TableName: tableName,
    IndexName: EIndexName.CommentsByPriorityCreated,
    KeyConditionExpression: '#p = :p',
    ExpressionAttributeNames: {
      '#p': 'postId',
    },
    ExpressionAttributeValues: {
      ':p': postId,
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey
  })
}

export type CommentsInput = {
  postId: string
  exclusiveStartKey?: Exclude<any, string | number>
}
