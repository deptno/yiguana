import {DynamoDbApiInput, EIndexName, PostDocument} from './common'
import {paginationQuerySafe} from '../../../dynamodb/common'

export function commentReplies(params: DynamoDbApiInput & CommentRepliesInput) {
  const {tableName, client, commentId, nextToken} = params
  return paginationQuerySafe<PostDocument>(
    client,
    {
      TableName                : tableName,
      IndexName                : EIndexName.CommentCreatedAtIndex,
      KeyConditionExpression   : '#p = :p',
      ExpressionAttributeNames : {
        '#p': 'commentId',
      },
      ExpressionAttributeValues: {
        ':p': commentId,
      },
      ScanIndexForward: false,
      ReturnConsumedCapacity   : 'TOTAL'
    },
    nextToken
  )
}

export type CommentRepliesInput = {
  commentId: string
  nextToken?: string
}
