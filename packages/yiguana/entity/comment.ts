import {v4} from 'uuid'

export function createComment(params: CommentInput): Comment {
  const id = v4()
  return {
    ...params,
    postId: 'a',
    id
  }
}

export type Comment = CommentInput & {
  id: string
}
type CommentInput = {
  postId: string
}
