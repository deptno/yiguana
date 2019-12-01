import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Reply, ReplyUpdateUserInput} from '../../entity/reply'
import * as R from 'ramda'
import {EEntity} from '../../type'

export function updateReply(operator: DynamoDBInput, params: UpdateCommentReplyInput) {
  const {dynamodb, tableName} = operator
  const {data} = params

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk: data.hk,
        rk: EEntity.Comment,
      },
      UpdateExpression: 'SET #c = :c',
      ExpressionAttributeNames: {
        '#c': 'content',
      },
      ExpressionAttributeValues: {
        ':c': data.content,
      },
      ReturnValues: 'ALL_NEW',
    })
    .then<Reply>(R.prop('Attributes'))
}

export type UpdateCommentReplyInput = {
  data: ReplyUpdateUserInput
}
