import {DynamoDBInput} from '../../../entity/input/dynamodb'
import {YiguanaDocument, YiguanaDocumentHashRange} from '../../../type'
import * as R from 'ramda'
import {logStoreDdb} from '../../../lib/log'

export function del<T extends YiguanaDocument>(operator: DynamoDBInput, input: RemoveStoreInput): Promise<T | undefined> {
  logStoreDdb('del input %j', input)

  const {dynamodb, tableName} = operator

  return dynamodb
    .del({
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_OLD',
      TableName: tableName,
      Key: R.pick(['hk', 'rk'], input),
    })
    .then<T>(R.prop('Attributes'))
}

export type RemoveStoreInput = YiguanaDocumentHashRange
