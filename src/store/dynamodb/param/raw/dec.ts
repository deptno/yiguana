export async function dec<T extends Yiguana.Document>(tableName: string, input: Input<T>) {
  const {data, dec: {key, value}} = input

  return {
    TableName: tableName,
    Key: {
      hk: data.hk,
      rk: data.rk,
    },
    UpdateExpression: 'SET #v = #v - :v',
    ExpressionAttributeNames: {
      '#v': key as any,
    },
    ExpressionAttributeValues: {
      ':v': value
    },
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues: 'ALL_NEW',
  }
}

type Input<T extends Yiguana.Document> = {
  data: Yiguana.Document
  dec: {
    key: keyof T
    value: number
  }
}
