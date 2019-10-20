import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'

export async function unlike(store: YiguanaStore<Post>, ep: EntityFactory, input: UnlikeInput) {
  return store.unlikePost({
    post: input.data,
  })
}

export type UnlikeInput = {
  data: Post
}
