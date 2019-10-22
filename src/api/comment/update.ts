import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'
import {CommentUserInput} from '../../entity/comment'

export async function update(store: YiguanaStore, ep: EntityFactory, input: UpdateInput) {
  const {data , user} = input
  // TODO: updateComment
}

export type UpdateInput = {
  data: CommentUserInput
  user?: User
}
