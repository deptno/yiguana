import {EPriority} from '../../../entity/comment'

export function createPostOrderKey(key: OrderKey) {
  const {boardName, category = ''} = key
  const date = new Date().toISOString()

  return [boardName, category, date].join('#')
}
export function stringifyOrderKey(key: OrderKey) {
  const {boardName, category = ''} = key
  return [boardName, category].join('#')
}
export function parseOrderKey(key: string): OrderKey {
  return {} as OrderKey
}
type OrderKey = {
  boardName: string
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
