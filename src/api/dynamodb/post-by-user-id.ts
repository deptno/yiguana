import {DynamoDBInput, EIndexName} from './common'
import {stringifyOrderKey} from './key/order'
import {Key} from 'readline'

export function postsByUserId(operator: DynamoDBInput, params: PostsByUserIdInput) {
  const {tableName, dynamodb} = operator
  const {boardName, category, exclusiveStartKey, userId} = params
  console.log('listByUserId', userId)
  return dynamodb.query({
    TableName                : tableName,
    IndexName                : EIndexName.UserOrder,
    KeyConditionExpression   : '#p = :p and begins_with(#r, :r)',
    ExpressionAttributeNames : {
      '#p': 'userId',
      '#r': 'order',
    },
    ExpressionAttributeValues: {
      ':p': userId,
      ':r': stringifyOrderKey({board: boardName, category})
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity   : 'TOTAL',
    ExclusiveStartKey        : exclusiveStartKey
  })
}
export type PostsByUserIdInput = {
  boardName: string
  userId: string
  category?: string
  exclusiveStartKey?: Key
}
