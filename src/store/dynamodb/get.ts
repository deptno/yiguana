import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocument, YiguanaDocumentHashRange} from '../../type'
import * as R from 'ramda'

export async function get<T extends YiguanaDocument>(operator: DynamoDBInput, params: GetStoreInput) {
  const {dynamodb, tableName} = operator

  return dynamodb.get<T>({
    TableName: tableName,
    Key: R.pick(['hk', 'rk'], params),
  })
}

export type GetStoreInput = YiguanaDocumentHashRange
