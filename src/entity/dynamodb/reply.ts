import {User} from './user'
import {Comment} from './comment'
import {YiguanaObject} from './yiguana-object'
import {ValidationError} from '../system/error'
import {EYiguanaEntity} from '../meta/enum'

export class YiguanaCommentReply extends YiguanaObject {
  constructor(private data: Reply) {
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

export type Reply = Comment & {
  commentId: string
  mention?: Mention
}
type Mention = {
  userId: string
  user: User
}
