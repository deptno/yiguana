import {logStoreDdb as log} from '../../../../lib/log'

export function getPosts(tableName: string, input: Input) {
  log('getPosts input %j', input)

  const {exclusiveStartKey, limit = 10} = input

  return {
    TableName: tableName,
    IndexName: Yiguana.IndexType.posts,
    KeyConditionExpression: '#h = :h',
    ExpressionAttributeNames: {
      '#h': 'rk',
    },
    ExpressionAttributeValues: {
      ':h': Yiguana.EntityType.Post,
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
    Limit: limit
  }
}

type Input = {
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
}
