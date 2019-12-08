import {Post} from '../../entity/post'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity, EIndexName} from '../../type'
import {logStoreDdb} from '../../lib/log'

export function getPostsByCategory(operator: DynamoDBInput, input: PostsByCategoryInput) {
  logStoreDdb('getPostsByCategory input %j', input)

  const {tableName, dynamodb} = operator
  const {exclusiveStartKey, category = '', limit = 10} = input
  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.postsByCategory,
    KeyConditionExpression: '#h = :h and begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#h': 'rk',
      '#r': 'category',
    },
    ExpressionAttributeValues: {
      ':h': EEntity.Post,
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
