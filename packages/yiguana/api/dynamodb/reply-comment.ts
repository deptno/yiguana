import {CommentDocument, CreateApiInput, PostDocument} from './common'

export async function replyComment(operator: CreateApiInput, params: ReplyCommentInput) {
  const {dynamodb, tableName} = operator
  const {id, range} = params.comment
  const response = await dynamodb.update({
    TableName                : tableName,
    Key                      : {
      id,
      range
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
  comment: Pick<CommentDocument, 'id'|'range'>
}
