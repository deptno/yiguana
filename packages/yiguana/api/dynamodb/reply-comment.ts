import {CommentDocument, DynamoDbApiInput, PostDocument} from './common'
import {update} from '../../../dynamodb/common'

export async function replyComment(params: DynamoDbApiInput & ReplyCommentInput) {
  const {client, tableName, comment} = params
  const {id, range} = comment
  const response = await update(client, {
    ReturnConsumedCapacity   : 'TOTAL',
    ReturnValues             : 'ALL_NEW',
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
    }
  })
  if (response) {
    if (response.ConsumedCapacity) {
      const wcu = response.ConsumedCapacity.CapacityUnits
//      console.log({wcu})
    }
    return response.Attributes as PostDocument
  }
}
export type ReplyCommentInput = {
  comment: CommentDocument
}
