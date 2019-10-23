import {EPriority} from '../enum'

export type CommentUserInput = {
  postId: string
  content: string
  priority: EPriority
}

export type CommentUpdateUserInput = {
  hk: string
  postId: string
  content: string
  updatedAt?: string
}