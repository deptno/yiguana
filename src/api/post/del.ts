import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {PaginationResult} from '@deptno/dynamodb/dist/api'
import {PostInput} from '../../store/dynamodb/post'

export async function del(store: YiguanaStore<Post>, ep: EntityFactory, input: Input) {
  return store.removePost({hk: input.data.hk})
}

type Input = {
  data: Post
}
