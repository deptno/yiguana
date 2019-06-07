import {DynamoDbApiInput, PostDocument} from './common'
import {paginationQuerySafe} from '../../../dynamodb/common'
import {EIndexName} from './common'

export function list(params: DynamoDbApiInput & ListInput) {
  const {tableName, boardName, client, category, nextToken} = params
  return paginationQuerySafe<PostDocument>(
    client,
    {
      TableName                : tableName,
      IndexName                : EIndexName.BoardOrderIndex,
      KeyConditionExpression   : '#p = :p and begins_with(#r, :r)',
      ExpressionAttributeNames : {
        '#p': 'board',
        '#r': 'order',
      },
      ExpressionAttributeValues: {
        ':p': boardName,
        ':r': [boardName, category].join('#')
      },
      ReturnConsumedCapacity: 'TOTAL'
    },
    nextToken
  )
}
export type ListInput = {
  boardName: string
  nextToken?: string
  category?: string
  userId?: string
}
