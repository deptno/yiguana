import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'

export async function like(store: YiguanaStore<Post>, ep: EntityFactory, input: Input) {
  return store.likePost({
    post: input.data,
  })
}
type Input = {
  data: Post
}