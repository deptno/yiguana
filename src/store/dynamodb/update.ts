import {DynamoDBInput} from '../../entity/input/dynamodb'
import * as R from 'ramda'
import {YiguanaDocument} from '../../type'

export function update<T extends YiguanaDocument>(operator: DynamoDBInput, params: UpdateStoreInput) {
  const {dynamodb, tableName} = operator
  const {hk, rk, ...props} = params
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
      UpdateExpression: 'SET ' + set.join(', '),
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
      ReturnValues: 'ALL_NEW',
    })
    .then<T>(R.prop('Attributes'))
}

export type UpdateStoreInput = Omit<YiguanaDocument, 'createdAt'> & Required<Pick<YiguanaDocument, 'updatedAt'>>
