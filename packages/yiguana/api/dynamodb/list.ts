import {DynamoDbApiInput, EIndexName, PostDocument} from './common'
import {paginationQuerySafe} from '../../../dynamodb/common'
import {stringifyOrderKey} from './key/order'

export function list(params: DynamoDbApiInput & ListInput) {
  const {tableName, boardName, client, category, nextToken, userId} = params
  if (userId) {
    return listByUserId(params)
  }
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
export function listByUserId(params: DynamoDbApiInput & ListInput) {
  const {tableName, boardName, client, category, nextToken, userId} = params
  console.log('listByUserId', userId)
  return paginationQuerySafe<PostDocument>(
    client,
    {
      TableName                : tableName,
      IndexName                : EIndexName.UserOrderIndex,
      KeyConditionExpression   : '#p = :p and begins_with(#r, :r)',
      ExpressionAttributeNames : {
        '#p': 'userId',
        '#r': 'order',
      },
      ExpressionAttributeValues: {
        ':p': userId,
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
