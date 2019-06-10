import {CommentDocument, DynamoDbApiInput, EType} from './common'
import {put} from '../../../dynamodb/common'
import {dynamodbDoc} from '../../../dynamodb/document'
import {Comment} from '../../entity/comment'
import {createCommentOrderKey} from './key/order'
import {createIdKey} from './key/id'
import {createRangeKey} from './key/range'
import {extractType} from './key/type'

export async function addComment(params: DynamoDbApiInput & AddCommentInput) {
  const {client, tableName, comment} = params
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
  const putParams = {
    TableName: tableName,
    Item     : item
  }
  return await put<CommentDocument>(client, putParams)
}
export type AddCommentInput = {
  comment: Comment
}
