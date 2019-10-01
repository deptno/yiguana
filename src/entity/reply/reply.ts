import {EEntity} from '../enum'
import {uuid} from '../../lib/uuid'
import {ReplyUserInput} from './index'
import {User} from '../user'
import {YiguanaDocument} from '../../dynamodb/yiguana-document'

export function createReply(operator, params: CreateReplyInput): Reply {
  const {user, data} = params
  const reply: Reply = {
    hk: uuid(),
    rk: EEntity.Reply,
    createdAt: new Date().toISOString(),
    likes: 0,
    unlikes: 0,
    comments: 0,
    content: '',
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
  likes: number
  unlikes: number
  comments: number
  content: string
  userId?: string // gsi.hk
}
