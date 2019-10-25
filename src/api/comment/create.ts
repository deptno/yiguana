import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'
import {Comment, CommentUserInput} from '../../entity/comment'
import {head} from 'ramda'

export async function create(store: YiguanaStore, ep: EntityFactory, input: CreateInput) {
  const comment = ep.createComment(input)

  return Promise
    .all([
      store.addComment({
        data: comment,
      }),
      store.commentPost({
        data: {
          hk: input.data.postId,
        },
      }),
    ])
    .then<Comment>(head)

}

export type CreateInput = {
  data: CommentUserInput
  user: User
}
