//import {EPriority} from '../../../entity/dynamodb/comment'

export function createPostOrderKey(key: OrderKey) {
  const {category = ''} = key
  const date = new Date().toISOString()

  return [category, date].join('#')
}
export function stringifyOrderKey(key: OrderKey) {
  const {category = ''} = key
  return [category].join('#')
}
export function parseOrderKey(key: string): OrderKey {
  return {} as OrderKey
}
type OrderKey = {
  category: string
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
  priority: any //EPriority
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
