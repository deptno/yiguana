import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Comment} from '../../entity/Comment'

export async function updateComment(operator: DynamoDBInput, params: CommentInput) {
  const {dynamodb, tableName} = operator
  const {data} = params
  const {hk, rk} = data
  const response = await dynamodb.update({
    ReturnConsumedCapacity   : 'TOTAL',
    ReturnValues             : 'ALL_NEW',
    TableName                : tableName,
    Key                      : {
      hk,
      rk
    },
    UpdateExpression         : 'SET #c = :c, #u = :u',
    ExpressionAttributeNames : {
      '#c': 'content',
      '#u': 'updatedAt',
    },
    ExpressionAttributeValues: {
      ':c': data.content,
      ':u': new Date().toISOString(),
    }
  })
  if (response) {
    return response.Attributes as Comment
  }
}
export type CommentInput = {
  data: Comment
}
