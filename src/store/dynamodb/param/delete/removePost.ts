import {logStoreDdb} from '../../../../lib/log'

export function removePost(input: Input) {
  logStoreDdb('removePost input %j', input)

  const {hk, rk, user} = input
  const [name, value] = 'id' in user
    ? ['id', user.id]
    : ['pw', user.pw]

  return {
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

type Input = DynamoDB.Document & {
  user: Pick<Yiguana.Member, 'id'> | Pick<Yiguana.NonMember, 'pw'>
}
