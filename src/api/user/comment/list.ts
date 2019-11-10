import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {CommentsInput} from '../../../store/dynamodb/comments'

export async function list(store: MetadataStore, ef: EntityFactory, input: ListInput) {
  const {userId, like, exclusiveStartKey} = input

  if (like) {
    return store.commentsByUserLike({
      userId,
      exclusiveStartKey,
    })
  }
  return store.commentsByUserId({
    userId,
    exclusiveStartKey,
  })
}

export type ListInput = Pick<CommentsInput, 'exclusiveStartKey'> & {
  userId: string
  like?: boolean
}
