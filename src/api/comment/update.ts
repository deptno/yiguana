import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post, PostUserInput} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'

export async function update(store: YiguanaStore<Post>, ep: EntityFactory, input: Input) {
  console.error('todo')
}

type Input = {
  data: PostUserInput
  user?: User
}
