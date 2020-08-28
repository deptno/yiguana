import {logStoreDdb} from '../../../../lib/log'

export function update<T extends Yiguana.Document>(tableName: string, input: Input) {
  logStoreDdb('update input %j', input)

  const {hk, rk, ...props} = input
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
    }, {
      set: [] as string[],
      names: {},
      values: {},
    })

  return {
    TableName: tableName,
    Key: {
      hk,
      rk,
    },
    UpdateExpression: 'SET ' + set.join(', '),
    ExpressionAttributeNames: names,
    ExpressionAttributeValues: values,
    ReturnValues: 'ALL_NEW',
  }
}

type Input =
  Omit<Yiguana.Document, 'createdAt'>
  & Required<Pick<Yiguana.Document, 'updatedAt'>>
