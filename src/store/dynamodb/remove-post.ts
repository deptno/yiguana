import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Member, NonMember, Post, User} from '../../entity'
import * as R from 'ramda'
import {EEntityStatus, YiguanaDocumentHash} from '../../type'
import {logStoreDdb} from '../../lib/log'

export function removePost(operator: DynamoDBInput, input: RemovePostInput) {
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
        ':s': EEntityStatus.deletedByUser,
        ':c': value
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_NEW',
      ConditionExpression: `#u.#c = :c`
    })
    .then<Post>(R.prop('Attributes'))
}

export type RemovePostInput = YiguanaDocumentHash & {
  user: Pick<Member, 'id'> | Pick<NonMember, 'pw'>
}
