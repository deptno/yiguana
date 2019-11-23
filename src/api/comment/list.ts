import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {CommentsInput} from '../../store/dynamodb/comments'
import {logApiComment} from '../../lib/log'

export async function list(store: MetadataStore, ep: EntityFactory, input: ListInput) {
  log('list %j', input)
  return store.comments(input as CommentsInput)
}

export type ListInput = CommentsInput
  | (
  {
    postId?: string
    userId?: string
    like?: boolean
  } & Omit<CommentsInput, 'postId'>
  )

const log = logApiComment.extend('list')
