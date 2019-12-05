import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Reply, ReplyUpdateUserInput} from '../../entity/reply'
import * as R from 'ramda'
import {EEntity} from '../../type'

export function updateReply(operator: DynamoDBInput, params: UpdateCommentReplyInput) {
  const {dynamodb, tableName} = operator

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk: params.hk,
        rk: EEntity.Comment,
      },
      UpdateExpression: 'SET #c = :c',
      ExpressionAttributeNames: {
        '#c': 'content',
      },
      ExpressionAttributeValues: {
        ':c': params.content,
      },
      ReturnValues: 'ALL_NEW',
    })
    .then<Reply>(R.prop('Attributes'))
}

export type UpdateCommentReplyInput = ReplyUpdateUserInput
