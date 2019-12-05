import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Comment, CommentUpdateUserInput} from '../../entity/comment'
import * as R from 'ramda'
import {EEntity} from '../../type'

export async function updateComment(operator: DynamoDBInput, params: UpdateCommentInput) {
  const {dynamodb, tableName} = operator
  // TODO: MAX_CONTENT_LENGTH 활용한 content length 체크해서 300자 넘으면 얼럿 띄우기?

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk: params.hk,
        rk: EEntity.Comment,
      },
      UpdateExpression: 'SET #c = :c, #u = :u',
      ExpressionAttributeNames: {
        '#c': 'content',
        '#u': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':c': params.content,
        ':u': params.updatedAt,
      },
      ReturnValues: 'ALL_NEW',
    })
    .then<Comment>(R.prop('Attributes'))
}
export type UpdateCommentInput = CommentUpdateUserInput
