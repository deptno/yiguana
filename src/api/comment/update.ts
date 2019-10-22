import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {CommentUpdateUserInput} from '../../entity/comment'

export async function update(store: YiguanaStore, ep: EntityFactory, input: UpdateInput) {
  const {data} = input
  return store.updateComment({
    data
  })
}

export type UpdateInput = {
  data: CommentUpdateUserInput
}
