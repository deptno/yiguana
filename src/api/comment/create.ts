import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'
import {CommentUserInput} from '../../entity/comment'

export async function create(store: YiguanaStore<Comment>, ep: EntityFactory, input: CreateInput) {
  const {data, user} = input
  const comment = ep.createComment({
    data: data
  })

  return store.addComment({data: comment})
}

export type CreateInput = {
  data: CommentUserInput
  user?: User
}
