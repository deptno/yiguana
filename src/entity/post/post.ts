import {PostContent} from './post-content'
import {User} from '../user'
import {keys} from '../../dynamodb/keys'
import {EEntity, YiguanaDocument} from '../../type'

export function createPost(params: CreatePostInput): Post {
  const {user, data} = params
  const createdAt = new Date().toISOString()
  const entity = EEntity.Post
  const posts = keys.posts.stringify({createdAt})
  const byUser = keys.byUser.post.stringify({entity, createdAt})
  const category = keys.category.stringify({
    category: data.input.category,
    createdAt,
  })

  const post: Post = {
    hk: data.id,
    rk: entity,
    views: 0,
    likes: 0,
    children: 0,
    title: data.input.title,
    contentUrl: data.contentUrl,
    cover: data.input.cover,
    user,
    createdAt,
    posts,
    category,
    byUser,
  }
  if ('id' in user) {
    post.userId = user.id
  }

  return post
}

export type CreatePostInput = {
  data: PostContent
  user: User
}
export interface Post extends YiguanaDocument {
  rk: EEntity.Post
  views: number
  likes: number
  children: number
  title: string
  contentUrl: string
  user: User
  cover?: string
  updatedAt?: string
  content?: string
  userId?: string // gsi.hk
  byUser?: string // gsi.rk
  category: string // gsi.rk
  posts: string // gsi.rk
}
