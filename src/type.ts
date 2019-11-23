import {User, Comment, Post} from './entity'

export type ApiInput<T> = {
  data: T
}
export type UserApiInput<T> = {
  data: T
  user: User
}

export type LikeCommentApiInput = UserApiInput<{
  data: Comment
  createdAt: string
}>
export type LikePostApiInput = UserApiInput<{
  data: Post
  createdAt: string
}>
export type ReportApiInput = UserApiInput<{
  data: Comment|Post
  createdAt: string
  content: string
}>
