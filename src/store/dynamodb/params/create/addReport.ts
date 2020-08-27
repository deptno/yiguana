export function addReport(tableName: string, input: Yiguana.ReportDocument) {
  return {
    TableName: tableName,
    Key: {
      hk: input.hk,
      rk: input.rk,
    },
    UpdateExpression: 'SET #uid = :uid, #b = :b, #c = :c, #u = :u, #d = :d, #co = :co',
    ExpressionAttributeNames: {
      '#h': 'hk',
      '#uid': 'userId',
      '#b': 'byUser',
      '#c': 'createdAt',
      '#u': 'user',
      '#d': 'data',
      '#co': 'content',
    },
    ExpressionAttributeValues: {
      ':uid': input.userId,
      ':b': input.byUser,
      ':c': input.createdAt,
      ':u': input.user,
      ':d': input.data,
      ':co': input.content,
    },
    ConditionExpression: 'attribute_not_exists(#h)',
    ReturnValues: 'ALL_NEW',
  }
}

