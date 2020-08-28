import {uuid} from '../../../../lib/uuid'
import {keys} from '../../../../dynamodb/keys'

export function createCommentDocument(params: Input): Yiguana.CommentDocument {
  const {user, data} = params
  const {postId, content, createdAt} = data
  const comment: Yiguana.CommentDocument = {
    hk: uuid(),
    rk: Yiguana.EntityType.Comment,
    likes: 0,
    comments: keys.comments.stringify({commentCreatedAt: createdAt}),
    user,
    postId,
    content,
    createdAt,
  }
  if ('id' in user) {
    comment.userId = user.id
    comment.byUser = keys.byUser.comment.stringify({
      entity: Yiguana.EntityType.Comment,
      createdAt
    })
  }

  return comment
}

type Input = {
  data: Yiguana.CommentUserInput
  user: Yiguana.User
}
