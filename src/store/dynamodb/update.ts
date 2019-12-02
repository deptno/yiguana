import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import * as R from 'ramda'
import {YiguanaDocument} from '../../type'

export function update(operator: DynamoDBInput, params: UpdateInput) {
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
    .then<Post>(R.prop('Attributes'))
}

export type UpdateInput = Omit<YiguanaDocument, 'createdAt'> & Required<Pick<YiguanaDocument, 'updatedAt'>>
