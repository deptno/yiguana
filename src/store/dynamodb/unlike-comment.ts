import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function unlikeComment(operator: DynamoDBInput, params: UnlikeCommentInput) {
  const {dynamodb, tableName} = operator
  const {hk} = params
  const rk = EEntity.Comment

  const response = await dynamodb.update({
    ReturnConsumedCapacity: 'TOTAL',
    TableName             : tableName,
    Key                   : {
      hk,
      rk,
    },
    UpdateExpression: 'SET #v = #v - :v',
    ExpressionAttributeNames : {
      '#v': 'likes'
    },
    ExpressionAttributeValues: {
      ':v': 1
    }
  })
  // TODO: 0에서 -1을 해서 음수가 되는 경우도 허용할 것인지 고민
  if (response)
    return Boolean(response)
}
export type UnlikeCommentInput = YiguanaDocumentHash
