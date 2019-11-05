import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {CommentsInput} from '../../store/dynamodb/comments'
import {EEntity} from '../../entity/enum'

export async function list(store: MetadataStore, ep: EntityFactory, input: ListInput) {
  if ('userId' in input) {
    const {userId, exclusiveStartKey} = input
    if (userId && input.like) {
      return store.commentsByUserLike({
        userId,
        entity: EEntity.Comment
      })
    }
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
    like?: boolean
  } & Omit<CommentsInput, 'postId'>
  )