import {logStoreDdb} from '../../../../lib/log'

export function addLike(tableName: string, input: Input) {
  logStoreDdb('addLike input %j', input)


  return {
    TableName: tableName,
    Key: {
      hk: input.hk,
      rk: input.rk,
    },
    UpdateExpression: 'SET #uid = :uid, #b = :b, #c = :c, #u = :u, #d = :d',
    ExpressionAttributeNames: {
      '#h': 'hk',
      '#uid': 'userId',
      '#b': 'byUser',
      '#c': 'createdAt',
      '#u': 'user',
      '#d': 'data',
    },
    ExpressionAttributeValues: {
      ':uid': input.userId,
      ':b': input.byUser,
      ':c': input.createdAt,
      ':u': input.user,
      ':d': input.data,
    },
    ConditionExpression: 'attribute_not_exists(#h)',
    ReturnValues: 'ALL_NEW',
  }
}

export type Input = Yiguana.LikeDocument