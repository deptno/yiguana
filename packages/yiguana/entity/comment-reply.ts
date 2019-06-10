import {UserInput} from './user'
import {CommentInput} from './comment'

export function createCommentReply(params: CommentReplyInput): CommentReply|undefined {
  const {postId, comment, parentCommentId, mention} = params

  if (mention) {
    // todo 언급된 유저 처리
  }
  return {
    ...params,
  }
}
const COMMENT_MAX_LENGTH = 300

export type CommentReply = CommentReplyInput & {
}
export type CommentReplyInput = CommentInput & {
  parentCommentId: string
  mention?: Mention
}
type Mention = {
  userId: string
  user: UserInput
}
