import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Reply} from '../../entity/reply'
import {EIndexName} from '../../dynamodb/yiguana-index'

export function replies(operator: DynamoDBInput, params: RepliesInput) {
  const {dynamodb, tableName} = operator
  const {commentId, nextToken} = params

  return dynamodb.query<Reply>({
    TableName                : tableName,
    IndexName                : EIndexName.Replies,
    KeyConditionExpression   : '#p = :p',
    ExpressionAttributeNames : {
      '#p': 'commentId',
    },
    ExpressionAttributeValues: {
      ':p': commentId,
    },
    ScanIndexForward         : false,
    ReturnConsumedCapacity   : 'TOTAL'
  })
}

export type RepliesInput = {
  commentId: string
  nextToken?: string
}
