import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity, EEntityStatus, YiguanaDocumentHash} from '../../type'
import {Comment} from '../../entity'
import * as R from 'ramda'
import {logStoreDdb} from '../../lib/log'

export async function removeComment(operator: DynamoDBInput, input: RemoveCommentInput) {
  logStoreDdb('removeComment input %j', input)

  const {dynamodb, tableName} = operator
  const {hk} = input
  const rk = EEntity.Comment

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
      },
      ExpressionAttributeValues: {
        ':s': EEntityStatus.deletedByUser,
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_NEW',
    })
    .then<Comment>(R.prop('Attributes'))
}
export type RemoveCommentInput = YiguanaDocumentHash
