import {logStoreDdb} from '../../../../lib/log'

export function getPostsByCategory(tableName: string, input: Input) {
  logStoreDdb('getPostsByCategory input %j', input)

  const {exclusiveStartKey, category = '', limit = 10} = input

  return {
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
}

type Input = {
  category: string
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
}
