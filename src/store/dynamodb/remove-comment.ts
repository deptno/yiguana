import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocumentHash, EEntityStatus} from '../../dynamodb'
import {EEntity} from '../../entity/enum'
import {Comment} from '../../entity'
import * as R from 'ramda'

export async function removeComment(operator: DynamoDBInput, params: RemoveCommentInput) {
  const {dynamodb, tableName} = operator
  const {hk} = params
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
