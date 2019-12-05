import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocument, YiguanaDocumentHashRange} from '../../type'
import * as R from 'ramda'

export function del<T extends YiguanaDocument>(operator: DynamoDBInput, params: RemoveStoreInput): Promise<T | undefined> {
  const {dynamodb, tableName} = operator

  return dynamodb
    .del({
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_OLD',
      TableName: tableName,
      Key: R.pick(['hk', 'rk'], params),
    })
    .then<T>(R.prop('Attributes'))
}

export type RemoveStoreInput = YiguanaDocumentHashRange
