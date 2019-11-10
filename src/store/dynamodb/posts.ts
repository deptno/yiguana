import {Post} from '../../entity/post'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EIndexName} from '../../dynamodb'
import {EEntity} from '../../entity/enum'

export function posts(operator: DynamoDBInput, params: PostsInput) {
  const {tableName, dynamodb} = operator
  const {exclusiveStartKey} = params
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
    Limit: 50
  }

  return dynamodb.query<Post>(queryParams)
}

export type PostsInput = {
  exclusiveStartKey?: Exclude<any, string | number>
}
