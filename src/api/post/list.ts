import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {PostsInput} from '../../store/dynamodb/posts'

export async function list(store: YiguanaStore<Post>, ep: EntityFactory, input: PostsInput) {
  return store.posts(input)
}

export type ListInput = PostsInput
