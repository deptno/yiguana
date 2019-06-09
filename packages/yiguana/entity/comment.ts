import {createIdKey} from '../api/dynamodb/key/id'

export function createComment(params: CommentInput): Comment {
  const id = createIdKey()
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
