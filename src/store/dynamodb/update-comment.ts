import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Comment, CommentUpdateUserInput} from '../../entity/comment'
import * as R from 'ramda'
import {EEntity} from '../../type'
import {logStoreDdb} from '../../lib/log'
import {assertMaxLength, assertsMemberOrNot} from '../../lib/assert'

export async function updateComment(operator: DynamoDBInput, input: UpdateCommentInput) {
  logStoreDdb('updateComment input %j', input)

  assertMaxLength(input.content, 300)

  const {dynamodb, tableName} = operator

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk: input.hk,
        rk: EEntity.Comment,
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
    .then<Comment>(R.prop('Attributes'))
}
export type UpdateCommentInput = CommentUpdateUserInput
