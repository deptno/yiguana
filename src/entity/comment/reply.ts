import {uuid} from '../../lib/uuid'
import {Comment, User, ReplyUserInput} from '..'
import {keys} from '../../dynamodb/keys'
import {EEntity} from '../../type'

export function createReply(params: CreateReplyInput): Reply {
  const {user, data} = params
  const {comment, content, createdAt, refUserName} = data
  const entity = EEntity.Comment
  const [commentCreatedAt] = comment.comments.split('#')
  const comments = keys.comments.stringify({
    commentCreatedAt, // root 에 있는 parent createdAt 값 추출
    replyCreatedAt: createdAt,
  })
  const reply: Reply = {
    hk: uuid(),
    rk: entity,
    likes: 0,
    commentId: (comment as Reply).commentId || comment.hk,
    postId: comment.postId,
    content,
    createdAt,
    comments,
    user,
    refUserName,
  }
  if ('id' in user) {
    reply.userId = user.id
    reply.byUser = keys.byUser.reply.stringify({entity, createdAt})
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
