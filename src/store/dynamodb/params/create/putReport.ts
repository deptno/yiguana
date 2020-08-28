import {logStoreDdb} from '../../../../lib/log'

export function putReport(tableName: string, input: Yiguana.ReportDocument) {
  logStoreDdb('report input %j', input)

  return {
      TableName: tableName,
      Key: {
        hk: input.hk,
        rk: input.rk,
      },
      UpdateExpression: 'SET #u = :u, #b = :b, #c = :c, #uid = :uid, #ct = :ct, #d = :d, #s = :s',
      ExpressionAttributeNames: {
        '#h': 'hk',
        '#u': 'user',
        '#b': 'byUser',
        '#c': 'createdAt',
        '#uid': 'userId',
        '#ct': 'content',
        '#d': 'data',
        '#s': 'status',
      },
      ExpressionAttributeValues: {
        ':u': input.user,
        ':b': input.byUser,
        ':c': input.createdAt,
        ':uid': input.userId,
        ':ct': input.content,
        ':d': input.data,
        ':s': input.status,
      },
      ConditionExpression: 'attribute_not_exists(#h)',
      ReturnValues: 'ALL_NEW',
    }
}