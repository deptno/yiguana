import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'
import {ReplyUpdateUserInput} from '../../entity/reply'

export async function update(store: YiguanaStore, ep: EntityFactory, input: UpdateInput) {
  const {data} = input
  return store.updateReply({
    data
  })
}

export type UpdateInput = {
  data: ReplyUpdateUserInput
  user?: User
}
