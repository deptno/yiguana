import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Comment, CommentUpdateUserInput} from '../../entity/comment'
import {EEntity} from '../../entity/enum'

export async function updateComment(operator: DynamoDBInput, params: UpdateCommentInput) {
  const {dynamodb, tableName} = operator
  const {data} = params
  // TODO: MAX_CONTENT_LENGTH 활용한 content length 체크해서 300자 넘으면 얼럿 띄우기?

  const response = await dynamodb.update({
    ReturnConsumedCapacity   : 'TOTAL',
    ReturnValues             : 'ALL_NEW',
    TableName                : tableName,
    Key                      : {
      hk: data.hk,
      rk: EEntity.Comment,
    },
    UpdateExpression         : 'SET #c = :c, #u = :u',
    ExpressionAttributeNames : {
      '#c': 'content',
      '#u': 'updatedAt',
    },
    ExpressionAttributeValues: {
      ':c': data.content,
      ':u': data.updatedAt,
    }
  })
  // TODO: Comment 타입 리턴이 적합할지 Boolean 타입 리턴이 적합할지 고민
  if (response) {
    return response.Attributes as Comment
  }
}
export type UpdateCommentInput = {
  data: CommentUpdateUserInput
}
