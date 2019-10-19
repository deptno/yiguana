import {EEntity} from '../enum'
import {uuid} from '../../lib/uuid'
import {ReplyUserInput} from './index'
import {User} from '../user'
import {YiguanaDocument} from '../../dynamodb/yiguana-document'

export function createReply(params: CreateReplyInput): Reply {
  const {user, data} = params
  const {commentId, content, createdAt} = data
  // TODO: createdAt 의 시간 지정을 createReply 타이밍에 하는 것이 나아보임
  const order = [EEntity.Reply, createdAt].join('#')
  const reply: Reply = {
    hk: uuid(),
    rk: EEntity.Reply,
    likes: 0,
    unlikes: 0,
    commentId,
    content,
    createdAt,
    order
  }
  if (user) {
    reply.userId = user.userId
  }

  return reply
}

export type CreateReplyInput = {
  data: ReplyUserInput
  user?: User
}
export interface Reply extends YiguanaDocument {
  commentId: string
  likes: number
  unlikes: number
  content: string
  createdAt: string
  userId?: string // gsi.hk
}
