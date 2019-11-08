import {Comment} from '../comment'

export type ReplyUserInput = {
  comment: Pick<Comment, 'hk'|'createdAt'|'postId'>
  content: string
  createdAt: string
}

export type ReplyUpdateUserInput = {
  hk: string
  commentId: string
  content: string
  updatedAt?: string
}