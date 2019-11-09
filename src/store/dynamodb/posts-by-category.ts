import {Post} from '../../entity/post'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EIndexName} from '../../dynamodb/yiguana-index'
import {EEntity} from '../../entity/enum'

export function postsByCategory(operator: DynamoDBInput, params: PostsByCategoryInput) {
  const {tableName, dynamodb} = operator
  const {category = '', exclusiveStartKey} = params
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
    Limit: 50
  }

  return dynamodb.query<Post>(queryParams)
}

export type PostsByCategoryInput = {
  category: string
  exclusiveStartKey?: Exclude<any, string | number>
}
