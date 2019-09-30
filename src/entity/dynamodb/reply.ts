import {YiguanaObject} from './yiguana-object'
import {User} from '../system'
import {EYiguanaEntity} from './enum'
import {ReplyUserInput} from '../input/reply'
import {uuid} from '../../lib/uuid'

export function createReply(operator, params: CreateReplyInput): Reply {
  const {user, data} = params
  const reply: Reply = {
    hk: uuid(),
    rk: EYiguanaEntity.Reply,
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
export interface Reply extends YiguanaObject {
  likes: number
  unlikes: number
  comments: number
  content: string
  userId?: string // gsi.hk
}
