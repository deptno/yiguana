import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {CommentsInput} from '../../store/dynamodb/get-comments'
import {logApiComment as log} from '../../lib/log'
import {ApiInput} from '../../type'

export async function list(store: MetadataStore, ep: EntityFactory, input: ListApiInput) {
  log('list %j', input)

  return store.getComments(input.data as CommentsInput)
}

// TODO: 타입 이상함 유니온 타입 실제로 맞는지 확인
export type ListApiInput = ApiInput<CommentsInput
  | (
  {
    postId?: string
    userId?: string
    like?: boolean
  } & Omit<CommentsInput, 'postId'>
  )>
