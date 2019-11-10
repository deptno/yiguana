import {Comment} from './comment'

export type CommentUserInput = {
  postId: string
  content: string
}

export type CommentUpdateUserInput = Pick<Comment, 'hk'|'postId'|'content'|'updatedAt'>
