import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post, PostUserInput} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'

export async function create(store: YiguanaStore<Post>, ep: EntityFactory, input: Input) {
  const {data, user} = input

  // TODO:
}

export type ApiAddPost = (input: Input) => Promise<unknown>
type Input = {
  data: PostUserInput
  user?: User
}
