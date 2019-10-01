import {Key} from 'readline'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EIndexName} from '../../entity/dynamodb/enum'

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
      ':r': '@todo'
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
