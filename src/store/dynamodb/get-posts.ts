import {Post} from '../../entity/post'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity, EIndexName} from '../../type'
import {logStoreDdb as log} from '../../lib/log'

export function getPosts(operator: DynamoDBInput, input: PostsInput) {
  log('getPosts input %j', input)

  const {tableName, dynamodb} = operator
  const {exclusiveStartKey, limit = 10} = input
  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.posts,
    KeyConditionExpression: '#h = :h',
    ExpressionAttributeNames: {
      '#h': 'rk',
    },
    ExpressionAttributeValues: {
      ':h': EEntity.Post,
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
