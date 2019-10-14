import {EPriority} from '../src/entity/enum'
import {Comment} from '../src/entity/comment'

export const uiComment = (c: Comment) => {
  return {
    'TYPE': EPriority[c.priority],
    'CONTENT': c.content,
    'AUTHOR': c.userId,
    'TIME': c.createdAt,
  }
}