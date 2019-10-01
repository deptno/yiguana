import {Comment} from '../../entity/comment'
import {DynamoDBInput} from '../../entity/input/dynamodb'

export async function addComment(operator: DynamoDBInput, params: AddCommentInput) {
  const {dynamodb, tableName} = operator
  const {comment} = params

  return dynamodb.put<Comment>(
    {
      TableName: tableName,
      Item: dynamodb.util.js2DdbDoc(comment),
    },
  )
}

export type AddCommentInput = {
  comment: Comment
}
