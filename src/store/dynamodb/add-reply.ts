import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Reply} from '../../entity/reply/reply'
import {ReplyUserInput} from '../../entity/reply'

export async function addReply(operator: DynamoDBInput, params: AddCommentReplyInput) {
  const {dynamodb, tableName} = operator
  const {reply} = params

  return dynamodb.put<Reply>({
    TableName: tableName,
    Item     : dynamodb.util.js2DdbDoc(reply)
  })
}

export type AddCommentReplyInput = {
  reply: ReplyUserInput
}
