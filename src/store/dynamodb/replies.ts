import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Reply} from '../../entity/reply'
import {EIndexName} from '../../type'
import {Comment} from '../../entity/comment'
import {keys} from '../../dynamodb/keys'

export function replies(operator: DynamoDBInput, params: RepliesInput) {
  const {dynamodb, tableName} = operator
  const {comment, nextToken} = params

  return dynamodb.query<Reply>({
    TableName: tableName,
    IndexName: EIndexName.comments,
    KeyConditionExpression: '#p = :p AND begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#p': 'postId',
      '#r': 'comments',
    },
    ExpressionAttributeValues: {
      ':p': comment.postId,
      ':r': keys.comments.stringify({commentCreatedAt: comment.createdAt}) + '#',
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
  })
}

export type RepliesInput = {
  comment: Comment
  nextToken?: string
}
