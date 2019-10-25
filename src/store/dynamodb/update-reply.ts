import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Reply} from '../../entity/reply/reply'
import {EEntity} from '../../entity/enum'
import {ReplyUpdateUserInput} from '../../entity/reply'

export async function updateReply(operator: DynamoDBInput, params: UpdateCommentReplyInput) {
  const {dynamodb, tableName} = operator
  const {data} = params
  console.log(data)

  return dynamodb.update<Reply>({
    TableName: tableName,
    Key: {
      hk: data.hk,
      rk: EEntity.Reply,
    },
    UpdateExpression: 'SET #c = :c',
    ExpressionAttributeNames: {
      '#c': 'content',
    },
    ExpressionAttributeValues: {
      ':c': data.content,
    },
  })
}

export type UpdateCommentReplyInput = {
  data: ReplyUpdateUserInput
}
