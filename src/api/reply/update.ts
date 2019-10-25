import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'
import {ReplyUserInput} from '../../entity/reply'

export async function update(store: YiguanaStore, ep: EntityFactory, input: UpdateInput) {
  console.error('todo')
}

export type UpdateInput = {
  data: ReplyUserInput
  user?: User
}
