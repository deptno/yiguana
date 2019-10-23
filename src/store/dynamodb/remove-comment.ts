import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {EEntity} from '../../entity/enum'

export async function removeComment(operator: DynamoDBInput, params: RemoveCommentInput) {
  const {dynamodb, tableName} = operator
  const {hk} = params
  const rk = EEntity.Comment

  const response = await dynamodb.update({
    ReturnConsumedCapacity: 'TOTAL',
    TableName             : tableName,
    Key                   : {
      hk,
      rk
    },
    UpdateExpression: 'SET deleted = :d',
    ExpressionAttributeValues: {
      ':d': true
    }
  })

  return Boolean(response)
}
export type RemoveCommentInput = YiguanaDocumentHash
