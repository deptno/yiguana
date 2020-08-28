export async function commentPost(tableName: string, input: Yiguana.Document) {
  return {
    TableName: tableName,
    Key: {
      hk: input.hk,
      rk: Yiguana.EntityType.Post,
    },
    UpdateExpression: 'SET #v = #v + :v',
    ExpressionAttributeNames: {
      '#v': 'children',
    },
    ExpressionAttributeValues: {
      ':v': 1,
    },
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues: 'ALL_NEW',
  }
}

