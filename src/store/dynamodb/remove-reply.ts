import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function removeReply(operator: DynamoDBInput, params: RemoveCommentReplyInput) {
  const {dynamodb, tableName} = operator
  const {hk} = params
  const rk = EEntity.Comment

  const response = await dynamodb.update({
    TableName: tableName,
    Key: {
      hk,
      rk
    },
    UpdateExpression: 'SET deleted = :d',
    ExpressionAttributeValues: {
      ':d': true,
    },
  })

  return Boolean(response)
}
export type RemoveCommentReplyInput = YiguanaDocumentHash
