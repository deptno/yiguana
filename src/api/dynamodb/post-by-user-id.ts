import {Key} from 'readline'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EIndexName} from '../../entity/dynamodb/enum'

export function postsByUserId(operator: DynamoDBInput, params: PostsByUserIdInput) {
  const {tableName, dynamodb} = operator
  const {category, exclusiveStartKey, userId} = params

  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.UserOrder,
    KeyConditionExpression: '#p = :p',
    ExpressionAttributeNames: {
      '#p': 'userId',
    },
    ExpressionAttributeValues: {
      ':p': userId,
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
  }
  if (category) {
    queryParams.KeyConditionExpression += ' and begins_with(#r, :r)'
    queryParams.ExpressionAttributeNames['#r'] = 'category'
    queryParams.ExpressionAttributeValues[':r'] = category
  }

  return dynamodb.query(queryParams)
}
export type PostsByUserIdInput = {
  userId: string
  category?: string
  exclusiveStartKey?: Key
}
