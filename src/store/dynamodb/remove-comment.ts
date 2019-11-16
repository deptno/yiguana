import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
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
      UpdateExpression: 'SET deleted = :d',
      ExpressionAttributeValues: {
        ':d': true,
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_NEW',
    })
    .then<Comment>(R.prop('Attributes'))
}
export type RemoveCommentInput = YiguanaDocumentHash
