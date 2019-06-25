import {User} from './user'

export function createPost(post: PostInput): Post {
  const {title, author, content, category, board, ip} = post
  const {id: userId, ...authorProps} = author
  const hasImage = regexpHasImage.test(content)

  return {
    content,
    title,
    userId,
    board,
    category,
    ip,
    hasImage,
    views: 0,
    likes: 0,
    comments: 0,
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
  hasImage?: boolean
}
export type PostInput = {
  title: string
  content: string
  board: string
  category: string
  ip: string
  author: Pick<User, 'id'|'name'|'thumbnail'>
}
