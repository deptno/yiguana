import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {PostsInput} from '../../store/dynamodb/posts'
import {PaginationResult} from '@deptno/dynamodb/dist/api'
import {CommentsInput} from '../../store/dynamodb/comments'
import {RepliesInput} from '../../store/dynamodb/replies'

export async function list(store: YiguanaStore, ep: EntityFactory, input: ListInput) {
  return store.replies(input)
}

export type ListInput = RepliesInput
