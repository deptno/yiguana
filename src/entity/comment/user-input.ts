export type CommentUserInput = {
  postId: string
  content: string
}

export type CommentUpdateUserInput = {
  hk: string
  postId: string
  content: string
  updatedAt?: string
}