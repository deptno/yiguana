import {YiguanaDocument} from '../../dynamodb/yiguana-document'
import {Member, User} from '../user'
import {LikeInput} from './user-input'
import {EEntity} from '../enum'
import {keys} from '../../dynamodb/keys'
import {Post} from '../post'
import {Comment} from '../comment'

export function createLike(params: CreateLikeInput): Like {
  const {user, data} = params
  const {entity, targetId, createdAt} = data
  const {id: userId, ...userOmitId} = user
  const hk = targetId
  const rk = keys.rk.like.stringify({
    entity: EEntity.Like,
    target: entity,
    userId,
  })
  const byUser = keys.byUser.stringify({
    entity: EEntity.Like,
    createdAt
  })

  return {
    hk,
    rk,
    userId,
    byUser,
    createdAt,
    user: userOmitId,
  }
}

export type CreateLikeInput = {
  data: LikeInput & {
    data: Post|Comment
  }
  user: Member
}
export interface Like extends YiguanaDocument {
  userId: string
  byUser: string
  user: Omit<User, 'id'>
}
