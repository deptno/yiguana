import {CommentDocument, DynamoDbApiInput, EType} from './common'
import {put} from '../../../dynamodb/common'
import {dynamodbDoc} from '../../../dynamodb/document'
import {Comment} from '../../entity/comment'
import {createIdKey} from './key/id'
import {createRangeKey} from './key/range'
import {extractType} from './key/type'
import {createCommentOrderKey} from './key/order'

export async function addComment(params: DynamoDbApiInput & AddCommentInput) {
  const {client} = params
  return await put<CommentDocument>(client, addCommentParams(params))
}
export function addCommentParams(params: DynamoDbApiInput & AddCommentInput) {
  const {tableName, comment} = params
  const doc = dynamodbDoc(comment)
  const id = createIdKey()
  const order = createCommentOrderKey({priority: comment.priority})
  const range = createRangeKey(EType.Comment)
  const _type = extractType(range)
  const item: CommentDocument = {
    ...doc,
    _type,
    range,
    order,
    id
  }
  return {
    TableName: tableName,
    Item     : item
  }
}
export type AddCommentInput = {
  comment: Comment
}
