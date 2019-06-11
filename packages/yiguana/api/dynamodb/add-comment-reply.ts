import {CommentReplyDocument, DynamoDbApiInput, EType} from './common'
import {put} from '../../../dynamodb/common'
import {dynamodbDoc} from '../../../dynamodb/document'
import {createIdKey} from './key/id'
import {createRangeKey} from './key/range'
import {extractType} from './key/type'
import {CommentReply} from '../../entity/comment-reply'

export async function addCommentReply(params: DynamoDbApiInput & AddCommentReplyInput) {
  const {client} = params
  return await put<CommentReplyDocument>(client, addCommentReplyParams(params))
}
export function addCommentReplyParams(params: DynamoDbApiInput & AddCommentReplyInput) {
  const {tableName, commentReply} = params
  const doc = dynamodbDoc(commentReply)
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
  return {
    TableName: tableName,
    Item     : item
  }
}
export type AddCommentReplyInput = {
  commentReply: CommentReply
}
