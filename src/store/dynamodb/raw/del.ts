import {{dynamodb, tableName}} from '../..//input/dynamodb'
import * as R from 'ramda'
import {logStoreDdb} from '../../../lib/log'

export function del<T extends Yiguana.Document>(operator: {dynamodb, tableName}, input: RemoveStoreInput): Promise<T | undefined> {
  logStoreDdb('del input %j', input)

  const {dynamodb, tableName} = operator

  return dynamodb
    .del({
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_OLD',
      TableName: tableName,
      Key: R.pick(['hk', 'rk'], input),
    })
    .then<T>(response => response.Attributes)
}

export type RemoveStoreInput = Yiguana.Document
