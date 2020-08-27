import {{dynamodb, tableName}} from '..//input/dynamodb'
import {Member, NonMember, Post, User} from '../'
import * as R from 'ramda'
import {logStoreDdb} from '../../lib/log'

export function removePost(operator: {dynamodb, tableName}, input: RemovePostInput) {
  logStoreDdb('removePost input %j', input)

  const {dynamodb, tableName} = operator
  const {hk, user} = input
  const rk = 'post'
  const [name, value] = 'id' in user
    ? ['id', user.id]
    : ['pw', user.pw]

  return dynamodb
    .update({
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
        ':c': value
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_NEW',
      ConditionExpression: `#u.#c = :c`
    })
    .then<Post>(response => response.Attributes)
}

export type RemovePostInput = Yiguana.Document & {
  user: Pick<Member, 'id'> | Pick<NonMember, 'pw'>
}
