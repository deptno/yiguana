import {YiguanaObject} from './yiguana-object'
import {User} from '../system'
import {EYiguanaEntity} from './enum'
import {ReplyUserInput} from '../input/reply'
import {uuid} from '../../lib/uuid'

export function createReply(operator, params: CreateCommentInput): Comment {
  const {user, data} = params
  const comment: Comment = {
    hk: uuid(),
    rk: EYiguanaEntity.Comment,
    createdAt: new Date().toISOString(),
    comments: 0,
    content: ''
  }
  if (user) {
    comment.userId = user.userId
  }

  return comment
}

export type CreateCommentInput = {
  data: ReplyUserInput
  user?: User
}
export interface Comment extends YiguanaObject {
  comments: number
  content: string
  userId?: string // gsi.hk
//  postId: string
//  user: User
//  priority: EPriority
//  ip: string
//  password?: string
}

const MAX_CONTENT_LENGTH = 300

export enum EPriority {
  Top = 10,
  SuperComment = 20,
  Normal = 50,
}

// mention 을 commentReply 보다 comment 에 두는 것이 맞는지 확인
// 댓글에도 like|(dislike) 가 있어야 함
// ip 필요
// 신고 필요

/**
 * 멘션 A, B를 이용해서 스레드를 만들 수 있는지
 * A 댓글
 * B A 언급
 * A B 언급
 * C A 언급
 *
 * mentionThread [commentId]#[userId]#[date]
 */


