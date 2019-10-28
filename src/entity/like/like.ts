import {YiguanaDocument} from '../../dynamodb/yiguana-document'
import {User} from '../user'
import {uuid} from '../../lib/uuid'
import {LikeInput} from './user-input'
import {EEntity} from '../enum'

export function createLike(params: CreateLikeInput): Like {
  const {user, data} = params

  if (!user) {
    throw new Error('user is required')
  }
  if (!('userId' in user)) {
    throw new Error('user.userId is required')
  }

  const {entity, targetId, createdAt} = data
  const like: Like = {
    hk: uuid(),
    rk: EEntity.Like,
    like: [user.userId, entity, targetId].join('#'),
    createdAt
  }
  return like
}

export type CreateLikeInput = {
  data: LikeInput
  user: User
}
export interface Like extends YiguanaDocument {
  rk: EEntity.Like
  like: string
}
