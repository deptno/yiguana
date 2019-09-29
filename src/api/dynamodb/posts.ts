import {DynamoDBInput, EIndexName} from './common'
import {Post} from '../../entity/dynamodb'

export function posts(operator: DynamoDBInput, params: PostsInput) {
  const {tableName, dynamodb} = operator
  const {category, exclusiveStartKey} = params

  return dynamodb.query<Post>({
    TableName: tableName,
    IndexName: EIndexName.RkCategory,
    KeyConditionExpression: '#h = :h and begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#h': 'rk',
      '#r': 'category',
    },
    ExpressionAttributeValues: {
      ':h': 'post',
      ':r': category,
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
  })
}

export type PostsInput = {
  category: string
  exclusiveStartKey?: Exclude<any, string | number>
}
