export async function dec<T extends Yiguana.Document>(tableName: string, input: DecStoreInput<T>) {
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

export type DecStoreInput<T extends Yiguana.Document> = {
  data: Yiguana.Document
  dec: {
    key: keyof T
    value: number
  }
}
