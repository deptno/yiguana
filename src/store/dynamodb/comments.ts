import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EIndexName} from '../../entity/dynamodb/enum'
import {Comment} from '../../entity/comment'

export function comments<T = Comment>(operator: DynamoDBInput, params: CommentsInput) {
  const {tableName, dynamodb} = operator
  const {postId, nextToken} = params

  return dynamodb.query<T>({
    TableName: tableName,
    IndexName: EIndexName.Comment,
    KeyConditionExpression: '#p = :p',
    ExpressionAttributeNames: {
      '#p': 'postId',
    },
    ExpressionAttributeValues: {
      ':p': postId,
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
  })
}

export type CommentsInput = {
  postId: string
  nextToken?: string
}
