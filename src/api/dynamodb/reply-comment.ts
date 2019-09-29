import {CommentDocument, DynamoDBInput, PostDocument} from './common'

export async function replyComment(operator: DynamoDBInput, params: ReplyCommentInput) {
  const {dynamodb, tableName} = operator
  const {hk, rk} = params.comment
  const response = await dynamodb.update({
    TableName                : tableName,
    Key                      : {
      hk,
      rk
    },
    UpdateExpression         : 'SET #v = #v + :v',
    ExpressionAttributeNames : {
      '#v': 'replies'
    },
    ExpressionAttributeValues: {
      ':v': 1
    },
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues          : 'ALL_NEW',
  })
  if (response) {
    if (response.ConsumedCapacity) {
      const wcu = response.ConsumedCapacity.CapacityUnits
      console.log({wcu})
    }
    return response.Attributes as PostDocument
  }
}

export type ReplyCommentInput = {
  comment: Pick<CommentDocument, 'hk'|'rk'>
}
