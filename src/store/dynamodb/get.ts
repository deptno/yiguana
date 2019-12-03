import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocumentHashRange} from '../../type'

export async function get<T = any>(operator: DynamoDBInput, params: GetInput) {
  const {dynamodb, tableName} = operator

  return dynamodb.get<T>({
    TableName: tableName,
    Key: params,
  })
}

export type GetInput = YiguanaDocumentHashRange
