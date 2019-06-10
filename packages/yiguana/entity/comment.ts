import {UserInput} from './user'

export function createComment(params: CommentInput): Comment|undefined {
  const {postId, comment} = params

  if (comment.length > COMMENT_MAX_LENGTH) {
    console.error(`comment length(${comment.length}) > 300`)
    return
  }
  return {
    ...params,
  }
}
const COMMENT_MAX_LENGTH = 300

export type Comment = CommentInput & {
}
export type CommentInput = {
  postId: string
  comment: string
  userId: string
  user: UserInput
  priority: EPriority
}
export enum EPriority {
  Top = 10,
  SuperComment = 20,
  Normal = 50,
}
