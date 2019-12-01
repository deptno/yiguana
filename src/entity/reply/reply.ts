import {EEntity} from '../enum'
import {uuid} from '../../lib/uuid'
import {ReplyUserInput} from './index'
import {User} from '../user'
import {YiguanaDocument} from '../../dynamodb'
import {keys} from '../../dynamodb/keys'

export function createReply(params: CreateReplyInput): Reply {
  const {user, data} = params
  const {comment, content, createdAt, refUserName} = data
  const entity = EEntity.Comment
  // TODO: createdAt 의 시간 지정을 createReply 타이밍에 하는 것이 나아보임
  const [commentCreatedAt] = comment.comments.split('#')
  const comments = keys.comments.stringify({
    commentCreatedAt, // root 에 있는 parent createdAt 값 추출
    replyCreatedAt: createdAt
  })
  const reply: Reply = {
    hk: uuid(),
    rk: entity,
    likes: 0,
    unlikes: 0,
    commentId: comment.commentId || comment.hk,
    postId: comment.postId,
    content,
    createdAt,
    comments,
    user,
    refUserName,
  }
  if ('id' in user) {
    // TODO: user 처리
    reply.userId = user.id
    reply.byUser = keys.byUser.reply.stringify({entity, createdAt})
  }

  return reply
}

export type CreateReplyInput = {
  data: ReplyUserInput
  user: User
}
export interface Reply extends YiguanaDocument {
  postId: string
  commentId: string
  likes: number
  unlikes: number
  content: string
  createdAt: string
  userId?: string // gsi.hk
  byUser?: string // gsi.rk
  user: Omit<User, 'id'>
  comments: string
  refUserName?: string // for mention
}
