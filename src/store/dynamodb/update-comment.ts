import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Comment} from '../../entity/comment'
import {EEntity} from '../../entity/enum'

export async function updateComment(operator: DynamoDBInput, hk: string, content: string, updatedAt: string) {
  const {dynamodb, tableName} = operator

  // TODO: MAX_CONTENT_LENGTH 활용한 content length 체크해서 300자 넘으면 얼럿 띄우기?

  const response = await dynamodb.update({
    ReturnConsumedCapacity   : 'TOTAL',
    ReturnValues             : 'ALL_NEW',
    TableName                : tableName,
    Key                      : {
      hk,
      'rk': EEntity.Comment,
    },
    UpdateExpression         : 'SET #c = :c, #u = :u',
    ExpressionAttributeNames : {
      '#c': 'content',
      '#u': 'updatedAt',
    },
    ExpressionAttributeValues: {
      ':c': content,
      ':u': updatedAt,
    }
  })
  if (response) {
    return response.Attributes as Comment
  }
}
