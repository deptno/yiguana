import {DynamoDBInput} from '../../../entity/input/dynamodb'
import * as R from 'ramda'
import {YiguanaDocumentHashRange} from '../../../type'

export async function incAndCreateIfNotExists<T extends YiguanaDocumentHashRange>(
  operator: DynamoDBInput,
  params: IncStoreInput<T>
) {
  const {dynamodb, tableName} = operator
  const {data, inc: {key, value}} = params
  const childrenUpdatedAt = new Date().toISOString()
  const {hk, rk, ... props} = data
  const {names, values, set} = Object
    .entries(props)
    .reduce((agg, [key, value], i) => {
      const symbol = String.fromCharCode(i + 97)
      const n = `#${symbol}`
      const v = `:${symbol}`

      agg.set.push(`${n} = ${v}`)
      agg.names[n] = key
      agg.values[v] = value

      return agg
    }, {set: [] as string[], names: {}, values: {}})

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk,
        rk,
      },
      UpdateExpression: 'SET ' + [
        ...set,
        '#vv = if_not_exists(#vv, :dd) + :vv',
        '#tt = :tt',
      ].join(', '),
      ExpressionAttributeNames: {
        ...names,
        '#vv': key as string,
        '#tt': 'childrenUpdatedAt',
      },
      ExpressionAttributeValues: {
        ...values,
        ':vv': value,
        ':dd': 0,
        ':tt': childrenUpdatedAt
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