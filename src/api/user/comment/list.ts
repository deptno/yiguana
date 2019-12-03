import {MetadataStore} from '../../../store/dynamodb'
import {EntityFactory} from '../../../entity'
import {logApiUserComment as log} from '../../../lib/log'
import {ApiInputWithUser} from '../../../type'
import {assertsMember} from '../../../lib/assert'

export async function list(store: MetadataStore, ef: EntityFactory, input: ListApiInput) {
  log('input %j', input)

  assertsMember(input.user)

  const {user, data} = input
  const {like, exclusiveStartKey} = data
  const {id: userId} = user

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

export type ListApiInput = ApiInputWithUser<{
  exclusiveStartKey?: Exclude<any, string | number>
  like?: boolean
}>

