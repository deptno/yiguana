import {logStoreDdb} from '../../../../lib/log'

export async function removeComment(tableName: string, input: Input) {
  logStoreDdb('removeComment input %j', input)

  const {hk, user} = input
  const rk = Yiguana.EntityType.Comment
  const [name, value] = 'id' in user
    ? ['id', user.id]
    : ['pw', user.pw]

  return {
    TableName: tableName,
    Key: {
      hk,
      rk,
    },
    UpdateExpression: 'SET #s = :s',
    ExpressionAttributeNames: {
      '#s': 'status',
      '#u': 'user',
      '#c': name,
    },
    ExpressionAttributeValues: {
      ':s': Yiguana.EntityStatusType.deletedByUser,
      ':c': value,
    },
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues: 'ALL_NEW',
    ConditionExpression: `#u.#c = :c`,
  }
}
export type Input = Yiguana.Document & {
  user: Pick<Yiguana.Member, 'id'> | Pick<Yiguana.NonMember, 'pw'>
}
