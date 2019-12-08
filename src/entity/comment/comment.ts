import {uuid} from '../../lib/uuid'
import {User} from '../user'
import {CommentUserInput} from './user-input'
import {keys} from '../../dynamodb/keys'
import {EEntity, YiguanaDocument} from '../../type'

export function createComment(params: CreateCommentInput): Comment {
  const {user, data} = params
  const createdAt = new Date().toISOString()
  const entity = EEntity.Comment
  const comments = keys.comments.stringify({
    commentCreatedAt: createdAt,
  })
  const comment: Comment = {
    hk: uuid(),
    rk: entity,
    likes: 0,
    content: data.content,
    postId: data.postId,
    comments,
    createdAt,
    user,
  }

  if ('id' in user) {
    comment.userId = user.id
    comment.byUser = keys.byUser.comment.stringify({entity, createdAt})
  }

  return comment
}

export type CreateCommentInput = {
  data: CommentUserInput
  user: User
}
export interface Comment extends YiguanaDocument {
  rk: EEntity.Comment
  content: string
  postId: string
  user: User
  likes: number
  comments: string // gsi.rk
  userId?: string // gsi.user.hk
  byUser?: string //gsi.user.rk
  commentId?: string // reply 에서만 정의된다.
}
