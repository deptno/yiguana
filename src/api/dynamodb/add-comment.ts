import {CommentDocument, DynamoDBInput, EType} from './common'
import {Comment} from '../../entity/dynamodb/comment'
import {createHashKey} from './key/id'
import {createRangeKey} from './key/range'
import {extractType} from './key/type'
import {createCommentOrderKey} from './key/order'

export async function addComment(operator: DynamoDBInput, params: AddCommentInput) {
  const {dynamodb, tableName} = operator
  const {comment} = params
  const doc = dynamodb.util.js2DdbDoc(comment)
  const id = createHashKey()
  const order = createCommentOrderKey({priority: comment.priority})
  const range = createRangeKey(EType.Comment)
  const item: CommentDocument = {
    ...doc,
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
