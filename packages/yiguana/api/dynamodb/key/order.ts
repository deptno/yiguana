import {EPriority} from '../../../entity/dynamodb/comment'

export function createPostOrderKey(key: OrderKey) {
  const {board, category = ''} = key
  const date = new Date().toISOString()

  return [board, category, date].join('#')
}
export function stringifyOrderKey(key: OrderKey) {
  const {board, category = ''} = key
  return [board, category].join('#')
}
export function parseOrderKey(key: string): OrderKey {
  return {} as OrderKey
}
type OrderKey = {
  board: string
  category?: string
}

export function createCommentOrderKey(key: CommentOrderKey) {
  const {priority} = key
  const date = new Date().toISOString()

  return [
    priority,
    date
  ].join('#')
}
type CommentOrderKey = {
  priority: EPriority
}
export function createCommentReplyOrderKey(key: CommentReplyOrderKey) {
  const {commentId} = key
  const date = new Date().toISOString()

  return [
    commentId,
    date
  ].join('#')
}
type CommentReplyOrderKey = {
  commentId: string
}
