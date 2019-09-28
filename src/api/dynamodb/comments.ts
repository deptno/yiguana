import {CreateApiInput, EIndexName} from './common'

export function comments(operator: CreateApiInput, params: CommentsInput) {
  const {tableName, dynamodb} = operator
  const {postId, nextToken} = params

  return dynamodb.query({
    TableName                : tableName,
    IndexName                : EIndexName.PostOrderIndex,
    KeyConditionExpression   : '#p = :p',
    ExpressionAttributeNames : {
      '#p': 'postId',
    },
    ExpressionAttributeValues: {
      ':p': postId,
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity   : 'TOTAL',
  })
}

export type CommentsInput = {
  postId: string
  nextToken?: string
}
