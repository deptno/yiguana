import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post, PostUserInput} from '../../entity/post'
import {EntityFactory} from '../../entity'

export async function view(store: YiguanaStore<Post>, ep: EntityFactory, input: Input) {
  return store.viewPost({
    post: input.data
  })
}

type Input = {
  data: Post
}
