import {DynamoDBInput} from '../../../entity/input/dynamodb'
import {YiguanaDocument, YiguanaDocumentHashRange} from '../../../type'
import * as R from 'ramda'
import {logStoreDdb} from '../../../lib/log'

export async function get<T extends YiguanaDocument>(operator: DynamoDBInput, input: GetStoreInput) {
  logStoreDdb('get input %j', input)

  const {dynamodb, tableName} = operator

  return dynamodb.get<T>({
    TableName: tableName,
    Key: R.pick(['hk', 'rk'], input),
  })
}

export type GetStoreInput = YiguanaDocumentHashRange
