import {keys} from '../../../../dynamodb/keys'
import {logStoreDdb} from '../../../../lib/log'

export function getCommentsByUserId<T = Comment>(tableName: string, input: CommentsByUserIdInput) {
  logStoreDdb('getCommentsByUserId input %j', input)

  const {userId, exclusiveStartKey} = input

  return {
    TableName: tableName,
    IndexName: Yiguana.IndexType.byUser,
    KeyConditionExpression: '#h = :h AND begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#h': 'userId',
      '#r': 'byUser',
    },
    ExpressionAttributeValues: {
      ':h': userId,
      ':r': keys.byUser.comment.stringify({
        entity: Yiguana.EntityType.Comment,
      }),
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
  }
}

export type CommentsByUserIdInput = {
  userId: string
  postId?: string
  exclusiveStartKey?: Exclude<any, string | number>
}
