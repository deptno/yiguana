import {MetadataStore} from '../../store/dynamodb/params/create'
import {CommentsInput} from '../../store/dynamodb/params/read/get-comments'
import {logApiComment as log} from '../../lib/log'

export async function list(store: MetadataStore, input: ListApiInput) {
  log('list %j', input)

  return store.getComments(input.data as CommentsInput)
}

// TODO: 타입 이상함 유니온 타입 실제로 맞는지 확인
export type ListApiInput = Yiguana.ApiInput<CommentsInput
  | (
  {
    postId?: string
    userId?: string
    like?: boolean
  } & Omit<CommentsInput, 'postId'>
  )>
