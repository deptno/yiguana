import {EEntity} from '../enum'
import {YiguanaDocument} from '../../dynamodb/yiguana-document'
import {User} from '../user'
import {uuid} from '../../lib/uuid'
import {LikeInput} from './user-input'

export function createLike(params: CreateLikeInput): Like {
  const {user, data} = params
  const {entity, targetId} = data
  const createdAt = new Date().toISOString()
  const like: Like = {
    hk: uuid(),
    rk: EEntity.Like,
    entity,
    targetId,
    createdAt,
  }
  if ('userId' in user) {
    like.userId = user.userId
  }
  return like
}

export type CreateLikeInput = {
  data: LikeInput
  user: User
}
export interface Like extends YiguanaDocument {
  userId?: string // gsi.hk
  entity: string
  targetId: string
}
