import {User} from './user'

export function createPost(post: PostInput): Post {
  const {title, author, content, category, board, ip} = post
  const {id: userId, password, ...authorProps} = author
  const hasImage = regexpHasImage.test(content)

  return {
    content,
    title,
    password,
    userId,
    board,
    category,
    ip,
    hasImage,
    views: 0,
    likes: 0,
    comments: 0,
    createdAt: new Date().toISOString(),
    author: authorProps,
  }
}
const regexpHasImage = /(?:!\[(.*?)\]\((.*?)\))/

export type Post = {
  title: string
  content: string
  userId: User['id']
  author: Pick<User, 'name'|'thumbnail'>
  board: string
  category: string
  ip: string
  views: number
  likes: number
  comments: number
  createdAt: string
  hasImage?: boolean
  password?: string
}
export type PostInput = {
  title: string
  content: string
  board: string
  category: string
  ip: string
  author: Pick<User, 'id'|'name'|'thumbnail'|'password'>
  password?: string
}
