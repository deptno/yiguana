import {YiguanaDocument} from '../../dynamodb/yiguana-document'
import {Member} from '../user'
import {uuid} from '../../lib/uuid'
import {LikeInput} from './user-input'
import {EEntity} from '../enum'

export function createLike(params: CreateLikeInput): Like {
  const {user, data} = params
  const {entity, targetId, createdAt} = data
  const like: Like = {
    hk: uuid(),
    rk: EEntity.Like,
    like: [user.id, entity, targetId].join('#'),
    createdAt
  }
  return like
}

export type CreateLikeInput = {
  data: LikeInput
  user: Member
}
export interface Like extends YiguanaDocument {
  rk: EEntity.Like
  like: string
}
