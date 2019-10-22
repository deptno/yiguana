import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function likeComment(operator: DynamoDBInput, params: LikeCommentInput) {
  const {dynamodb, tableName} = operator
  const {hk} = params
  const response = await dynamodb.update({
    ReturnConsumedCapacity: 'TOTAL',
    TableName             : tableName,
    Key                   : {
      hk,
      rk: EEntity.Comment
    },
    UpdateExpression: 'SET #v = #v + :v',
    ExpressionAttributeNames : {
      '#v': 'likes'
    },
    ExpressionAttributeValues: {
      ':v': 1
    }
  })

  return Boolean(response)
}
export type LikeCommentInput = YiguanaDocumentHash
