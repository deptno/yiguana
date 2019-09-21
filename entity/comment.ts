export class Comment {
  postId: string
  comment: string
  userId: string
  user: any
  priority: EPriority
  ip: string
  password?: string
  good: number
  bad: number
  replies: number
}
interface DdbTableIndex {
  hk: string
  rk: string
}

export enum EPriority {
  Top          = 10,
  SuperComment = 20,
  Normal       = 50,
}
