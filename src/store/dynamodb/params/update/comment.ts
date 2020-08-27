import {logStoreDdb} from '../../../../lib/log'
import {assertMaxLength} from '../../../../lib/assert'

export async function comment(tableName: string, input: Input) {
  logStoreDdb('updateComment input %j', input)

  assertMaxLength(input.content, 300)

  return {
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
  }
}
export type Input = Pick<Yiguana.CommentDocument, 'hk'|'content'|'updatedAt'>
