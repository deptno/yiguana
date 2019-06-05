import {Author} from './author'

export function create(post: PostInput): Post {
  const {title, author, content, category} = post
  const {id: authorId, ...authorProps} = author
  // todo content 를 s3 에 올리고 그 주소를 받아온다.
  const s3 = 's3://'
  return {
    s3,
    title,
    authorId,
    category,
    views: 0,
    likes: 0,
    author: authorProps
  }
}

export type Post = {
  title: string
  s3: string
  authorId: Author['id']
  author: Pick<Author, 'name'|'thumbnail'>
  category: string
  views: number
  likes: number
}
type PostInput = {
  title: string
  content: string
  category: string
  author: Author
}
