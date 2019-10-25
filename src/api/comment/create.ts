import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'
import {CommentUserInput} from '../../entity/comment'
import {head} from 'ramda'

export async function create(store: YiguanaStore, ep: EntityFactory, input: CreateInput) {
  console.log({input})
  const comment = ep.createComment(input)
  console.log({comment})

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
    .then(head)

}

export type CreateInput = {
  data: CommentUserInput
  user: User
}
