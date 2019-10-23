import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {EntityFactory} from '../../entity'
import {PostsInput} from '../../store/dynamodb/posts'

export async function list(store: YiguanaStore, ep: EntityFactory, input: PostsInput) {
  return store.posts(input)
}

export type ListInput = PostsInput
