export async function inc<T extends Yiguana.Document>(input: Input<T>) {
  const {tableName, data, inc: {key, value}} = input

  return {
    TableName: tableName,
    Key: {
      hk: data.hk,
      rk: data.rk,
    },
    UpdateExpression: 'SET #v = #v + :v',
    ExpressionAttributeNames: {
      '#v': key,
    },
    ExpressionAttributeValues: {
      ':v': value,
    },
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues: 'ALL_NEW',
  }
}

type Input<T extends Yiguana.Document> = {
  tableName: string
  data: T
  inc: {
    key: keyof T
    value: number
  }
}
