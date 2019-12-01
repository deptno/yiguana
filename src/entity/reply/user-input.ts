import {Comment} from '../comment'

export type ReplyUserInput = {
  comment: Pick<Comment, 'hk'|'createdAt'|'postId'|'comments'|'commentId'>
  content: string
  createdAt: string
  refUserName?: string
}

export type ReplyUpdateUserInput = {
  hk: string
  commentId: string
  content: string
  updatedAt?: string
}