import {DynamoDBInput, EType} from './common'
import {createHashKey} from './key/id'
import {createRangeKey} from './key/range'
import {extractType} from './key/type'
import {CommentReply} from '../../entity/dynamodb/comment-reply'

export async function addCommentReply(operator: DynamoDBInput, params: AddCommentReplyInput) {
  const {dynamodb, tableName} = operator
  const {commentReply} = params
  const doc = dynamodb.util.js2DdbDoc(commentReply)
  const id = createHashKey()
  const range = createRangeKey(EType.CommentReply)
  const _type = extractType(range)
  const createdAt = new Date().toISOString()
  const item: CommentReplyDocument = {
    ...doc,
    _type,
    hk: id,
    rk: range,
    createdAt,
  }

  return dynamodb.put<CommentReplyDocument>({
    TableName: tableName,
    Item     : item
  })
}

export type AddCommentReplyInput = {
  commentReply: CommentReply
}
