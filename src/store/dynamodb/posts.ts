import {Post} from '../../entity/post'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EIndexName} from '../../dynamodb'
import {EEntity} from '../../entity/enum'

export function posts(operator: DynamoDBInput, params: PostsInput) {
  const {tableName, dynamodb} = operator
  const {exclusiveStartKey, limit = 10} = params
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
