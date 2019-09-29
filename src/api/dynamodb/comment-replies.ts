import {DynamoDBInput, EIndexName} from './common'

export function commentReplies(operator: DynamoDBInput, params: CommentRepliesInput) {
  const {dynamodb, tableName} = operator
  const {commentId, nextToken} = params

  return dynamodb.query({
    TableName                : tableName,
    IndexName                : EIndexName.CommentCreatedAt,
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
