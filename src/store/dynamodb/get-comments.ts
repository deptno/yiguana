import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Comment, Reply} from '../../entity/comment'
import {EIndexName} from '../../type'
import {logStoreDdb} from '../../lib/log'

export function getComments(operator: DynamoDBInput, input: CommentsInput) {
  logStoreDdb('getComments input %j', input)

  const {tableName, dynamodb} = operator
  const {postId, exclusiveStartKey, limit = 10, desc} = input

  return dynamodb.query<Comment|Reply>({
    TableName: tableName,
    IndexName: EIndexName.comments,
    KeyConditionExpression: '#p = :p',
    ExpressionAttributeNames: {
      '#p': 'postId',
    },
    ExpressionAttributeValues: {
      ':p': postId,
    },
    Limit: limit,
    ScanIndexForward: !desc,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
  })
}

export type CommentsInput = {
  postId: string
  desc?: boolean
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
}
