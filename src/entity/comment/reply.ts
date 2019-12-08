import {uuid} from '../../lib/uuid'
import {Comment, ReplyUserInput, User} from '..'
import {keys} from '../../dynamodb/keys'
import {EEntity} from '../../type'

export function createReply(params: CreateReplyInput): Reply {
  const {user, data} = params
  const {comment, content, createdAt, refUserName} = data
  const {commentCreatedAt} = keys.comments.parse(comment.comments)
  const comments = keys.comments.stringify({
    commentCreatedAt,
    replyCreatedAt: createdAt,
  })
  const reply: Reply = {
    hk: uuid(),
    rk: EEntity.Comment,
    likes: 0,
    commentId: comment.commentId || comment.hk,
    postId: comment.postId,
    content,
    createdAt,
    comments,
    user,
    refUserName,
  }
  if ('id' in user) {
    reply.userId = user.id
    reply.byUser = keys.byUser.reply.stringify({entity: EEntity.Comment, createdAt})
  }

  return reply
}

export type CreateReplyInput = {
  data: ReplyUserInput
  user: User
}
export interface Reply extends Comment {
  commentId: string
  refUserName?: string
}
