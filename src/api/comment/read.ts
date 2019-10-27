import {MetadataStore} from '../../store/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {PaginationResult} from '@deptno/dynamodb/dist/api'
import {PostInput} from '../../store/dynamodb/post'

export async function read(store: MetadataStore, ep: EntityFactory, input: PostInput) {
  return store.post(input)
}

export type ApiGetPost = (input: PostInput) => Promise<PaginationResult<Post>>
