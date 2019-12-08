import {Comment} from './comment'
import {Reply} from './reply'

export type CommentUserInput = {
  postId: string
  content: string
  createdAt: string
}

export type CommentUpdateUserInput = Pick<Comment, 'hk'|'postId'|'content'|'updatedAt'>
export type ReplyUserInput = {
  comment: Comment | Reply
  content: string
  createdAt: string
  refUserName?: string
}