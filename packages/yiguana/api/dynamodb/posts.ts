import {CreateApiInput, EIndexName} from './common'

export function posts(operator: CreateApiInput, params: PostsInput) {
  const {tableName, dynamodb} = operator
  const {board, category, exclusiveStartKey} = params

  return dynamodb.query({
    TableName: tableName,
    IndexName: EIndexName.BoardOrderIndex,
    KeyConditionExpression: '#h = :h and begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#h': 'board',
      '#r': 'order',
    },
    ExpressionAttributeValues: {
      ':h': board,
      ':r': [board, category].join('#'),
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
  })
}

export type PostsInput = {
  board: string
  category?: string
  exclusiveStartKey?: Exclude<any, string | number>
}
