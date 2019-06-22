import {User} from './user'

export function createPost(post: PostInput): Post {
  const {title, author, content, category} = post
  const {id: userId, ...authorProps} = author
  // todo content 를 s3 에 올리고 그 주소를 받아온다.
  return {
    content,
    title,
    userId,
    category,
    views: 0,
    likes: 0,
    comments: 0,
    author: authorProps
  }
}

export type Post = {
  title: string
  content: string
  userId: User['id']
  author: Pick<User, 'name'|'thumbnail'>
  category: string
  views: number
  likes: number
  comments: number
}
export type PostInput = {
  title: string
  content: string
  category: string
  author: Pick<User, 'id'|'name'|'thumbnail'>
}
