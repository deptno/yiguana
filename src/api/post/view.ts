import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post, PostUserInput} from '../../entity/post'
import {EntityFactory} from '../../entity'

export async function view(store: YiguanaStore<Post>, ep: EntityFactory, input: ViewInput) {
  return store.viewPost({
    post: input.data
  })
}

export type ViewInput = {
  data: Post
}
