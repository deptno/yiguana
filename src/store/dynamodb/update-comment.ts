import {{dynamodb, tableName}} from '..//input/dynamodb'
import {Comment, CommentUpdateUserInput} from '..//comment'
import * as R from 'ramda'
import {logStoreDdb} from '../../lib/log'
import {assertMaxLength} from '../../lib/assert'

export async function updateComment(operator: {dynamodb, tableName}, input: UpdateCommentInput) {
  logStoreDdb('updateComment input %j', input)

  assertMaxLength(input.content, 300)

  const {dynamodb, tableName} = operator

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk: input.hk,
        rk: Yiguana.EntityType.Comment,
      },
      UpdateExpression: 'SET #c = :c, #u = :u',
      ExpressionAttributeNames: {
        '#c': 'content',
        '#u': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':c': input.content,
        ':u': input.updatedAt,
      },
      ReturnValues: 'ALL_NEW',
    })
    .then<Comment>(response => response.Attributes)
}
export type UpdateCommentInput = CommentUpdateUserInput
