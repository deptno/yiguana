import {CreateApiInput, EIndexName} from './common'

export function commentReplies(operator: CreateApiInput, params: CommentRepliesInput) {
  const {dynamodb, tableName} = operator
  const {commentId, nextToken} = params

  return dynamodb.query({
    TableName                : tableName,
    IndexName                : EIndexName.CommentCreatedAtIndex,
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
