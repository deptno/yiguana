import {MetadataStore} from '../../../store/dynamodb/params/create'
import {logApiUserComment as log} from '../../../lib/log'
import {assertsMember} from '../../../lib/assert'

export async function list(store: MetadataStore, input: ListApiInput) {
  log('input %j', input)

  assertsMember(input.user)

  const {user, data} = input
  const {like, exclusiveStartKey} = data
  const {id: userId} = user

  if (like) {
    return store.getCommentsByUserLike({
      userId,
      exclusiveStartKey,
    })
  }

  return store.getCommentsByUserId({
    userId,
    exclusiveStartKey,
  })
}

export type ListApiInput = Yiguana.ApiInputWithUser<{
  exclusiveStartKey?: Exclude<any, string | number>
  like?: boolean
}>

