import {YiguanaObject} from './yiguana-object'
import {User} from '../system'
import {EYiguanaEntity} from './enum'
import {PostContent} from '../system/post-content'

export function createPost(operator, params: CreatePostInput): Post {
  const {user, data} = params
  const post: Post = {
    hk: data.id,
    rk: EYiguanaEntity.Post,
    createdAt: new Date().toISOString(),
    views: 0,
    likes: 0,
    comments: 0,
    category: data.input.category,
    title: data.input.title,
    contentUrl: data.contentUrl
  }
  if (user) {
    post.userId = user.userId
  }
  if (data.cover) {
    post.cover = data.cover
  }

  return post
}

export type CreatePostInput = {
  data: PostContent
  user?: User
}
export interface Post extends YiguanaObject {
  createdAt: string
  views: number
  likes: number
  comments: number
  category: string
  title: string
  contentUrl: string
  userId?: string // gsi.hk
  cover?: string
  updatedAt?: string
}
