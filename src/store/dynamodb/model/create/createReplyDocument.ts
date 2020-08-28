import {keys} from '../../../../dynamodb/keys'
import {uuid} from '../../../../lib/uuid'

export function createReplyDocument(params: Input): Yiguana.ReplyDocument {
  const {user, data} = params
  const {comment, content, createdAt, refUserName} = data
  const {commentCreatedAt} = keys.comments.parse(comment.comments)
  const comments = keys.comments.stringify({
    commentCreatedAt,
    replyCreatedAt: createdAt,
  })
  const reply: Yiguana.ReplyDocument = {
    hk: uuid(),
    rk: Yiguana.EntityType.Comment,
    likes: 0,
    commentId: comment.commentId || comment.hk,
    postId: comment.postId,
    content,
    createdAt,
    comments,
    user,
    refUserName,
  }
  if ('id' in user) {
    reply.userId = user.id
    reply.byUser = keys.byUser.reply.stringify({entity: Yiguana.EntityType.Comment, createdAt})
  }

  return reply
}

type Input = {
  data: Yiguana.ReplyUserInput
  user: Yiguana.User
}
