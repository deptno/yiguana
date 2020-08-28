import {logStoreDdb} from '../../../../lib/log'

export function getComments(tableName: string, input: CommentsInput) {
  logStoreDdb('getComments input %j', input)

  const {postId, exclusiveStartKey, limit = 10} = input

  return {
    TableName: tableName,
    IndexName: Yiguana.IndexType.comments,
    KeyConditionExpression: '#p = :p',
    ExpressionAttributeNames: {
      '#p': 'postId',
    },
    ExpressionAttributeValues: {
      ':p': postId,
    },
    Limit: limit,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
  }
}

export type CommentsInput = {
  postId: string
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
}
