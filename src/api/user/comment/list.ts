import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {EEntity} from '../../../entity/enum'
import {CommentsInput} from '../../../store/dynamodb/comments'

export async function list(store: MetadataStore, ef: EntityFactory, input: ListInput) {
  if ('userId' in input) {
    const {userId, exclusiveStartKey} = input
    if (userId && input.like) {
      return store.commentsByUserLike({
        userId,
      })
    }
    return store.commentsByUserId({
      userId: userId!,
      exclusiveStartKey,
    })
  }
}

export type ListInput = CommentsInput
  | (
  {
    postId?: string
    userId?: string
    like?: boolean
  } & Omit<CommentsInput, 'postId'>
  )
