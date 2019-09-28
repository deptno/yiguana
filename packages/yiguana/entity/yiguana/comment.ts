import {YiguanaObject} from './yiguana-object'
import {ValidationError} from './error'
import {EYiguanaEntity} from './enum'
import {User} from './user'

export class YiguanaComment extends YiguanaObject {
  public likes: number
  public dislikes: number
  public replies: number

  constructor(public data: Comment) {
    super(EYiguanaEntity.Comment)
  }

  protected validate() {
    const {comment} = this.data
    if (comment.length > MAX_CONTENT_LENGTH) {
      throw new ValidationError(`comment length(${comment.length}) > ${MAX_CONTENT_LENGTH}`)
    }
  }
}
// mention 을 commentReply 보다 comment 에 두는 것이 맞는지 확인
// 댓글에도 like|(dislike) 가 있어야 함
// ip 필요
// 신고 필요

const MAX_CONTENT_LENGTH = 300

export type Comment = {
  postId: string
  comment: string
  userId: string
  user: User
  priority: EPriority
  ip: string
  password?: string
}
export enum EPriority {
  Top = 10,
  SuperComment = 20,
  Normal = 50,
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

