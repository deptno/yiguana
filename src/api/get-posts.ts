import {YiguanaStore} from '../store/dynamodb/dynamodb'
import {Post} from '../entity/post'
import {EntityFactory} from '../entity'
import {PostsInput} from '../store/dynamodb/posts'
import {PaginationResult} from '@deptno/dynamodb/dist/api'

export async function getPosts(store: YiguanaStore<Post>, ep: EntityFactory, input: PostsInput) {
  return store.posts(input)
}

export type ApiGetPosts = (input: PostsInput) => Promise<PaginationResult<Post>>
