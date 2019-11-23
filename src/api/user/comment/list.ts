import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {CommentsInput} from '../../../store/dynamodb/comments'
import {logApiUserComment} from '../../../lib/log'

export async function list(store: MetadataStore, ef: EntityFactory, input: ListInput) {
  log('listG %j', input)

  const {userId, like, exclusiveStartKey} = input

  if (like) {
    return store.commentsByUserLike({
      userId,
      exclusiveStartKey,
    })
  }
  if (input.report) {
    return store.commentsByUserReport({
      userId: input.userId,
      exclusiveStartKey: input.exclusiveStartKey
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
  report?: boolean
}

const log = logApiUserComment.extend('list')
