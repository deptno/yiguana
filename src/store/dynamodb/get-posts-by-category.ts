import {Post} from '..//post'
import {logStoreDdb} from '../../lib/log'

export function getPostsByCategory(operator: {dynamodb, tableName}, input: PostsByCategoryInput) {
  logStoreDdb('getPostsByCategory input %j', input)

  const {tableName, dynamodb} = operator
  const {exclusiveStartKey, category = '', limit = 10} = input
  const queryParams = {
    TableName: tableName,
    IndexName: Yiguana.IndexType.postsByCategory,
    KeyConditionExpression: '#h = :h and begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#h': 'rk',
      '#r': 'category',
    },
    ExpressionAttributeValues: {
      ':h': Yiguana.EntityType.Post,
      ':r': category,
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
    Limit: limit
  }

  return dynamodb.query<Post>(queryParams)
}

export type PostsByCategoryInput = {
  category: string
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
}
