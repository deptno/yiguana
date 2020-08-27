import {{dynamodb, tableName}} from '../..//input/dynamodb'
import * as R from 'ramda'
import {logStoreDdb} from '../../../lib/log'

export async function get<T extends Yiguana.Document>(operator: {dynamodb, tableName}, input: GetStoreInput) {
  logStoreDdb('get input %j', input)

  const {dynamodb, tableName} = operator

  return dynamodb.get<T>({
    TableName: tableName,
    Key: R.pick(['hk', 'rk'], input),
  })
}

export type GetStoreInput = Yiguana.Document
