import {DynamoDbApiInput, EIndexName, PostDocument} from './common'
import {paginationQuerySafe} from '../../../dynamodb/common'

export function comments(params: DynamoDbApiInput & CommentsInput) {
  const {tableName, client, postId, nextToken} = params
  return paginationQuerySafe<PostDocument>(
    client,
    commentsParam(params),
    nextToken
  )
}
export function commentsParam(params: DynamoDbApiInput & CommentsInput) {
  const {tableName, postId} = params
  return {
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
  }
}

export type CommentsInput = {
  postId: string
  nextToken?: string
}
