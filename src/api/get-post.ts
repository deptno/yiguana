import {YiguanaStore} from '../store/dynamodb/dynamodb'
import {Post} from '../entity/post'
import {EntityFactory} from '../entity'
import {PaginationResult} from '@deptno/dynamodb/dist/api'
import {PostInput} from '../store/dynamodb/post'

export async function getPost(store: YiguanaStore<Post>, ep: EntityFactory, input: PostInput) {
  return store.post(input)
}

export type ApiGetPost = (input: PostInput) => Promise<PaginationResult<Post>>
