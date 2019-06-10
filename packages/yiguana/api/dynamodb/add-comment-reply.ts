import {CommentReplyDocument, DynamoDbApiInput, EType} from './common'
import {put} from '../../../dynamodb/common'
import {dynamodbDoc} from '../../../dynamodb/document'
import {createCommentOrderKey} from './key/order'
import {createIdKey} from './key/id'
import {createRangeKey} from './key/range'
import {extractType} from './key/type'
import {CommentReply} from '../../entity/comment-reply'

export async function addCommentReply(params: DynamoDbApiInput & AddCommentReplyInput) {
  const {client, tableName, commentReply} = params
  const {commentId, mention, postId, comment} = commentReply
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
  const putParams = {
    TableName: tableName,
    Item     : item
  }
  return await put<CommentReplyDocument>(client, putParams)
}
export type AddCommentReplyInput = {
  commentReply: CommentReply
}
