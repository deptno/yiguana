import {DynamoDBInput} from '../../../entity/input/dynamodb'
import * as R from 'ramda'
import {YiguanaDocumentHashRange} from '../../../type'

export async function dec<T extends YiguanaDocumentHashRange>(operator: DynamoDBInput, params: DecStoreInput<T>) {
  const {dynamodb, tableName} = operator
  const {data, dec: {key, value}} = params

  return dynamodb
    .update({
      TableName: tableName,
      Key: R.pick(['hk', 'rk'], data),
      UpdateExpression: 'SET #v = #v - :v',
      ExpressionAttributeNames: {
        '#v': key as any,
      },
      ExpressionAttributeValues: {
        ':v': value
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_NEW',
    })
    .then<T>(R.prop('Attributes'))
}

export type DecStoreInput<T extends YiguanaDocumentHashRange> = {
  data: YiguanaDocumentHashRange
  dec: {
    key: keyof T
    value: number
  }
}
