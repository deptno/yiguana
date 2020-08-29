import {logStoreDdb as log} from '../../../../lib/log'
import {EntityType, IndexType} from '../../../../enum'

export function getPosts(input: DynamoDB.Pagination) {
  log('getPosts input %j', input)

  const {exclusiveStartKey, limit = 10} = input

  return {
    IndexName: IndexType.posts,
    KeyConditionExpression: '#h = :h',
    ExpressionAttributeNames: {
      '#h': 'rk',
    },
    ExpressionAttributeValues: {
      ':h': EntityType.Post,
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
    Limit: limit
  }
}
