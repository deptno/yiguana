import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {CommentsInput} from '../../store/dynamodb/comments'

export async function list(store: MetadataStore, ep: EntityFactory, input: ListInput) {
  if ('userId' in input) {
    const {userId, exclusiveStartKey} = input

    return store.commentsByUserId({
      userId: userId!,
      exclusiveStartKey,
    })
  }
  return store.comments(input as CommentsInput)
}

export type ListInput = CommentsInput
  | (
  {
    postId?: string
    userId?: string
  } & Omit<CommentsInput, 'postId'>
  )