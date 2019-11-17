import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocumentHashRange} from '../../dynamodb'

export async function get<T = any>(operator: DynamoDBInput, params: GetInput) {
  const {dynamodb, tableName} = operator
  const {data} = params

  return dynamodb.get<T>({
    TableName: tableName,
    Key: data,
  })
}

export type GetInput = {
  data: YiguanaDocumentHashRange
}
