import {Post} from '..//post'
import {logStoreDdb as log} from '../../lib/log'

export function getPosts(operator: {dynamodb, tableName}, input: PostsInput) {
  log('getPosts input %j', input)

  const {tableName, dynamodb} = operator
  const {exclusiveStartKey, limit = 10} = input
  const queryParams = {
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

  return dynamodb.query<Post>(queryParams)
}

export type PostsInput = {
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
}
