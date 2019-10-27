import {EEntity} from '../enum'
import {PostContent} from './post-content'
import {YiguanaDocument} from '../../dynamodb/yiguana-document'
import {User} from '../user'

export function createPost(params: CreatePostInput): Post {
  const {user, data} = params
  const createdAt = new Date().toISOString()
  const category = [data.input.category, createdAt].join('#')
  const order = [EEntity.Post, category].join('#')
  const post: Post = {
    hk: data.id,
    rk: EEntity.Post,
    createdAt: createdAt,
    views: 0,
    likes: 0,
    children: 0,
    title: data.input.title,
    contentUrl: data.contentUrl,
    category,
    order,
  }
  if ('userId' in user) {
    post.userId = user.userId
  }
  if (data.cover) {
    post.cover = data.cover
  }

  return post
}

export type CreatePostInput = {
  data: PostContent
  user: User
}
export interface Post extends YiguanaDocument {
  views: number
  likes: number
  children: number
  category: string
  order: string
  title: string
  contentUrl: string
  userId?: string // gsi.hk
  cover?: string
  updatedAt?: string
  content?: string
}
