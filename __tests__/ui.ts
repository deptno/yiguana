import {Comment} from '../src/entity/comment'

export const uiComment = (c: Comment) => {
  return {
    'CONTENT': c.content,
    'AUTHOR': c.userId,
    'TIME': c.createdAt,
  }
}