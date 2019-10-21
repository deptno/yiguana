import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Reply} from '../../entity/reply/reply'

export async function addReply(operator: DynamoDBInput, params: AddCommentReplyInput) {
  const {dynamodb, tableName} = operator
  const {data} = params
  const item = dynamodb.util.js2DdbDoc(data)

  return dynamodb.put<Reply>({
    TableName: tableName,
    Item     : item
  })
}

export type AddCommentReplyInput = {
  data: Reply
}
