import {User} from './user'
import {Comment} from './comment'
import {YiguanaObject} from './yiguana-object'
import {ValidationError} from './error'
import {EYiguanaEntity} from './enum'

export class YiguanaCommentReply extends YiguanaObject {
  constructor(private data: CommentReply) {
    super(EYiguanaEntity.Comment)
  }

  validate() {
    const {comment} = this.data
    if (comment.length > MAX_CONTENT_LENGTH) {
      throw new ValidationError(`comment length(${comment.length}) > ${MAX_CONTENT_LENGTH}`)
    }
  }
}
const MAX_CONTENT_LENGTH = 200

export type CommentReply = Comment & {
  commentId: string
  mention?: Mention
}
type Mention = {
  userId: string
  user: User
}
