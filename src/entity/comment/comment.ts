import {EEntity, EPriority} from '../enum'
import {uuid} from '../../lib/uuid'
import {YiguanaDocument} from '../../dynamodb/yiguana-document'
import {User} from '../user'
import {CommentUserInput} from './user-input'
import {keys} from '../../dynamodb/keys'

export function createComment(params: CreateCommentInput): Comment {
  const {user, data} = params
  const createdAt = new Date().toISOString()
  const order = keys.order.comment.stringify({
    entity: EEntity.Comment,
    priority: EPriority.Normal,
    createdAt
  })
  const comment: Comment = {
    hk: uuid(),
    rk: EEntity.Comment,
    children: 0,
    likes: 0,
    content: data.content,
    priority: data.priority,
    postId: data.postId,
    order,
    createdAt,
    user: user,
  }

  if ('id' in user) {
    comment.userId = user.id
  }

  return comment
}

export type CreateCommentInput = {
  data: CommentUserInput
  user: User
}
export interface Comment extends YiguanaDocument {
  children: number
  content: string
  priority: EPriority
  order: string
  postId: string
  userId?: string // gsi.hk
  user: Omit<User, 'id'>
  updatedAt?: string
  likes: number
//  user: User
//  ip: string
//  password?: string
}

const MAX_CONTENT_LENGTH = 300

// mention 을 reply 보다 reply 에 두는 것이 맞는지 확인
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


