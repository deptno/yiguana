import {v4} from 'uuid'
import {PostId} from './post'

export function create(params: ReplyInput): Reply {
  const id = v4()
  return {
    ...params,
    postId: 'a',
    id
  }
}

export type ReplyId = string
export type Reply = ReplyInput & {
  id: ReplyId
}
type ReplyInput = {
  postId: PostId
}
