import {DynamoDBInput} from '../../../entity/input/dynamodb'
import * as R from 'ramda'
import {YiguanaDocumentHashRange} from '../../../type'

export async function incAndCreateIfNotExists<T extends YiguanaDocumentHashRange>(operator: DynamoDBInput, params: IncStoreInput<T>) {
  const {dynamodb, tableName} = operator
  const {data, inc: {key, value}} = params
  const childrenUpdatedAt = new Date().toISOString()

  return dynamodb
    .update({
      TableName: tableName,
      Key: R.pick(['hk', 'rk'], data),
      UpdateExpression: 'SET #v = if_not_exists(#v, :d) + :v, #t = :t',
      ExpressionAttributeNames: {
        '#v': key as string,
        '#t': 'childrenUpdatedAt',
      },
      ExpressionAttributeValues: {
        ':v': value,
        ':d': 0,
        ':t': childrenUpdatedAt
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