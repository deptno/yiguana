import {UserInput} from './user'

// mention 을 commentReply 보다 comment 에 두는 것이 맞는지 확인
// 댓글에도 like|(dislike) 가 있어야 함
// ip 필요
// 신고 필요

export function createComment(params: CommentInput): Comment | undefined {
  const {postId, comment} = params

  if (comment.length > COMMENT_MAX_LENGTH) {
    console.error(`comment length(${comment.length}) > 300`)
    return
  }
  return {
    ...params,
    likes   : 0,
    dislikes: 0,
    replies: 0,
  }
}
const COMMENT_MAX_LENGTH = 300

export type Comment = CommentInput & {
  likes: number
  dislikes: number
  replies: number
}
export type CommentInput = {
  postId: string
  comment: string
  userId: string
  user: UserInput
  priority: EPriority
  ip: string
  password?: string
}
export enum EPriority {
  Top          = 10,
  SuperComment = 20,
  Normal       = 50,
}


/**
 * 멘션 A, B를 이용해서 스레드를 만들 수 있는지
 * A 댓글
 * B A 언급
 * A B 언급
 * C A 언급
 *
 * mentionThread [commentId]#[userId]#[date]
 */

