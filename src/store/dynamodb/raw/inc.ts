import {DynamoDBInput} from '../../../entity/input/dynamodb'
import * as R from 'ramda'
import {YiguanaDocumentHashRange} from '../../../type'

export async function inc<T extends YiguanaDocumentHashRange>(operator: DynamoDBInput, params: IncStoreInput<T>) {
  const {dynamodb, tableName} = operator
  const {data, inc: {key, value}} = params

  return dynamodb
    .update({
      TableName: tableName,
      Key: R.pick(['hk', 'rk'], data),
      UpdateExpression: 'SET #v = #v + :v',
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

export type IncStoreInput<T extends YiguanaDocumentHashRange> = {
  data: YiguanaDocumentHashRange
  inc: {
    key: keyof T
    value: number
  }
}
