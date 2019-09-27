import {CommentDocument, CreateApiInput, EType} from './common'
import {Comment} from '../../entity/comment'
import {createHashKey} from './key/id'
import {createRangeKey} from './key/range'
import {extractType} from './key/type'
import {createCommentOrderKey} from './key/order'

export async function addComment(operator: CreateApiInput, params: AddCommentInput) {
  const {dynamodb, tableName} = operator
  const {comment} = params
  const doc = dynamodb.util.js2DdbDoc(comment)
  const id = createHashKey()
  const order = createCommentOrderKey({priority: comment.priority})
  const range = createRangeKey(EType.Comment)
  const _type = extractType(range)
  const item: CommentDocument = {
    ...doc,
    _type,
    rk: range,
    order,
    hk: id
  }
  return dynamodb.put<CommentDocument>({
    TableName: tableName,
    Item     : item
  })
}

export type AddCommentInput = {
  comment: Comment
}
