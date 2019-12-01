import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {PostsByUserIdInput} from '../../../store/dynamodb/posts-by-user-id'
import {PostsInput} from '../../../store/dynamodb/posts'
import {logApiUserPost} from '../../../lib/log'

export async function list(store: MetadataStore, ef: EntityFactory, input: ListInput) {
  log('input %j', input)

  if (input.like) {
    return store.postsByUserLike({
      userId: input.userId,
      exclusiveStartKey: input.exclusiveStartKey
    })
  }

  return store.postsByUserId(input as PostsByUserIdInput)
}

export type ListInput = PostsInput & {
  userId: string
  like?: boolean
}

const log = logApiUserPost.extend('list')
