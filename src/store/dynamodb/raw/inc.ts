import {{dynamodb, tableName}} from '../..//input/dynamodb'
import * as R from 'ramda'

export async function inc<T extends Yiguana.Document>(operator: {dynamodb, tableName}, params: IncStoreInput<T>) {
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
    .then<T>(response => response.Attributes)
}

export type IncStoreInput<T extends Yiguana.Document> = {
  data: Yiguana.Document
  inc: {
    key: keyof T
    value: number
  }
}
