import {CommentReplyDocument, CreateApiInput, EType} from './common'
import {createIdKey} from './key/id'
import {createRangeKey} from './key/range'
import {extractType} from './key/type'
import {CommentReply} from '../../entity/comment-reply'

export async function addCommentReply(operator: CreateApiInput, params: AddCommentReplyInput) {
  const {dynamodb, tableName} = operator
  const {commentReply} = params
  const doc = dynamodb.util.js2DdbDoc(commentReply)
  const id = createIdKey()
  const range = createRangeKey(EType.CommentReply)
  const _type = extractType(range)
  const createdAt = new Date().toISOString()
  const item: CommentReplyDocument = {
    ...doc,
    _type,
    id,
    range,
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
