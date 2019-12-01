import {uuid} from '../../lib/uuid'
import {YiguanaDocument} from '../../dynamodb/yiguana-document'
import {User} from '../user'
import {CommentUserInput} from './user-input'
import {keys} from '../../dynamodb/keys'
import {EEntity} from '../../type'

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
    children: 0,
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
  children: number
  content: string
  postId: string
  userId?: string // gsi.hk
  byUser?: string //gsi.rk
  comments: string // gsi.rk
  user: Omit<User, 'id'>
  updatedAt?: string
  likes: number
  commentId?: string
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


