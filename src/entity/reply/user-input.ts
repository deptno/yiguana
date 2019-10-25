export type ReplyUserInput = {
  commentId: string
  content: string
  createdAt: string
}

export type ReplyUpdateUserInput = {
  hk: string
  commentId: string
  content: string
  updatedAt?: string
}