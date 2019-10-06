import {EPriority} from '../enum'

export type CommentUserInput = {
  postId: string
  content: string
  priority: EPriority
}