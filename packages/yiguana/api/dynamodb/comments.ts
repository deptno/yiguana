import {DynamoDbApiInput, EIndexName, PostDocument} from './common'
import {paginationQuerySafe} from '../../../dynamodb/common'

export function comments(params: DynamoDbApiInput & CommentsInput) {
  const {tableName, client, postId, nextToken} = params
  return paginationQuerySafe<PostDocument>(
    client,
    {
      TableName                : tableName,
      IndexName                : EIndexName.CommentOrderIndex,
      KeyConditionExpression   : '#p = :p',
      ExpressionAttributeNames : {
        '#p': 'postId',
      },
      ExpressionAttributeValues: {
        ':p': postId,
      },
      ReturnConsumedCapacity   : 'TOTAL'
    },
    nextToken
  )
}

export type CommentsInput = {
  postId: string
  nextToken?: string
}
