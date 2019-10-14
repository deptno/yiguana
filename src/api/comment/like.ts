import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {LikePostInput} from '../../store/dynamodb/like-post'

export async function like(store: YiguanaStore<Post>, ep: EntityFactory, input: LikePostInput) {
  return store.likePost(input)
}
