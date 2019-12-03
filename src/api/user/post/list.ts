import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {PostsInput} from '../../../store/dynamodb/posts'
import {logApiUserPost as log} from '../../../lib/log'
import {ApiInputWithUser} from '../../../type'
import {assertsMember} from '../../../lib/assert'

export async function list(store: MetadataStore, ef: EntityFactory, input: ListApiInput) {
  log('list %j', input)

  assertsMember(input.user)

  const {user, data} = input
  const {id: userId} = user

  if (data.like) {
    return store.postsByUserLike({
      userId,
      exclusiveStartKey: data.exclusiveStartKey,
    })
  }

  return store.postsByUserId({
    ...data,
    userId
  })
}

export type ListApiInput = ApiInputWithUser<PostsInput & {
  like?: boolean
}>
