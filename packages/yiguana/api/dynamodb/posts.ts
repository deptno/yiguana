import {CreateApiInput, EIndexName} from './common'
import {stringifyOrderKey} from './key/order'
import {Key} from 'readline'

export function posts(operator: CreateApiInput, params: PostsInput) {
  const {tableName, dynamodb} = operator
  const {boardName, category, exclusiveStartKey} = params

  return dynamodb.query({
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
    ScanIndexForward         : false,
    ReturnConsumedCapacity   : 'TOTAL',
    ExclusiveStartKey        : exclusiveStartKey
  })
}

export type PostsInput = {
  boardName: string
  category?: string
  exclusiveStartKey?: Key
}
