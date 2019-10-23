import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'
import {ReplyUserInput} from '../../entity/reply'

export async function create(store: YiguanaStore, ep: EntityFactory, input: CreateInput) {
  const {data, user} = input

  //TODO:
}

export type CreateInput = {
  data: ReplyUserInput
  user: User
}
