import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EIndexName} from '../../entity/dynamodb/enum'

export function replies(operator: DynamoDBInput, params: CommentRepliesInput) {
  const {dynamodb, tableName} = operator
  const {commentId, nextToken} = params

  return dynamodb.query({
    TableName                : tableName,
    IndexName                : EIndexName.Comment,
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

export type CommentRepliesInput = {
  commentId: string
  nextToken?: string
}
