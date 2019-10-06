import {EEntity, EPriority} from '../enum'
import {uuid} from '../../lib/uuid'
import {YiguanaDocument} from '../../dynamodb/yiguana-document'
import {User} from '../user'
import {CommentUserInput} from './user-input'

export function createComment(params: CreateCommentInput): Comment {
  const {user, data} = params
  const createdAt = new Date().toISOString()
  const forComment = [data.priority, createdAt].join('#')
  const comment: Comment = {
    hk: uuid(),
    rk: EEntity.Comment,
    comments: 0,
    content: data.content,
    priority: data.priority,
    postId: data.postId,
    forComment,
    createdAt,
  }

  if (user) {
    comment.userId = user.userId
  }

  return comment
}

export type CreateCommentInput = {
  data: CommentUserInput
  user?: User
}
export interface Comment extends YiguanaDocument {
  comments: number
  content: string
  priority: EPriority
  forComment: string
  postId: string
  userId?: string // gsi.hk
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


