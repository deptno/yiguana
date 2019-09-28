import {CreateApiInput, EIndexName} from './common'

export function posts(operator: CreateApiInput, params: PostsInput) {
  const {tableName, dynamodb} = operator
  const {category, exclusiveStartKey} = params

  return dynamodb.query({
    TableName: tableName,
    IndexName: EIndexName.BoardOrderIndex,
    KeyConditionExpression: '#h = :h and begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#h': 'rk',
      '#r': 'order',
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
