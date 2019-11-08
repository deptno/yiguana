import {Post} from '../../entity/post'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EIndexName} from '../../dynamodb/yiguana-index'
import {EEntity} from '../../entity/enum'

export function posts(operator: DynamoDBInput, params: PostsInput) {
  const {tableName, dynamodb} = operator
  const {category = '', exclusiveStartKey} = params
  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.postsByCategory,
    KeyConditionExpression: '#h = :h',
    ExpressionAttributeNames: {
      '#h': 'rk',
    },
    ExpressionAttributeValues: {
      ':h': EEntity.Post
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
    Limit: 50
  }
  if (category) {
    queryParams.KeyConditionExpression += ' and begins_with(#r, :r)'
    queryParams.ExpressionAttributeNames['#r'] = 'category'
    queryParams.ExpressionAttributeValues[':r'] = category
  }

  return dynamodb.query<Post>(queryParams)
}

export type PostsInput = {
  category?: string
  exclusiveStartKey?: Exclude<any, string | number>
}
