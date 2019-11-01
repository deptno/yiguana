import {Key} from 'readline'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import {EEntity} from '../../entity/enum'
import {EIndexName} from '../../dynamodb/yiguana-index'

export function postsByUserId<T = Post>(operator: DynamoDBInput, params: PostsByUserIdInput) {
  const {tableName, dynamodb} = operator
  const {category, exclusiveStartKey, userId} = params

  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.ByUser,
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
    queryParams.ExpressionAttributeNames['#r'] = 'order'
    queryParams.ExpressionAttributeValues[':r'] = [EEntity.Post, category].join('#')
  }

  return dynamodb.query<T>(queryParams)
}
export type PostsByUserIdInput = {
  userId: string
  category?: string
  exclusiveStartKey?: Key
}
