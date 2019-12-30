import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity, EEntityStatus, YiguanaDocumentHash} from '../../type'
import {Comment, Member, NonMember} from '../../entity'
import * as R from 'ramda'
import {logStoreDdb} from '../../lib/log'

export async function removeComment(operator: DynamoDBInput, input: RemoveCommentInput) {
  logStoreDdb('removeComment input %j', input)

  const {dynamodb, tableName} = operator
  const {hk, user} = input
  const rk = EEntity.Comment
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
    .then<Comment>(R.prop('Attributes'))
}
export type RemoveCommentInput = YiguanaDocumentHash & {
  user: Pick<Member, 'id'> | Pick<NonMember, 'pw'>
}
