import {DynamoDbApiInput, EIndexName, PostDocument} from './common'
import {paginationQuerySafe} from '../../../dynamodb/common'
import {stringifyOrderKey} from './key/order'

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
        ':r': stringifyOrderKey({boardName, category})
      },
      ReturnConsumedCapacity   : 'TOTAL'
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
