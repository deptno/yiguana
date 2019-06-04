import {v4} from 'uuid'
import {DynamoDbDocument, ERange} from '../engine/db/dynamodb'

const range = ERange.Post
export function create(post: PostInput): Post {
  const id = v4()
  return {
    ...post,
    id,
    range
  }
}

export type PostId = string
export type Post = DynamoDbDocument<PostInput & {
  id: PostId
}>
type PostInput = {
  title: string
  content: string
  author: string
}
