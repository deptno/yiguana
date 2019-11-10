import {YiguanaDocument} from '../../dynamodb/yiguana-document'
import {Member, User} from '../user'
import {LikeInput} from './user-input'
import {EEntity} from '../enum'
import {keys} from '../../dynamodb/keys'
import {Post} from '../post'
import {Comment} from '../comment'

export function createLike(params: CreateLikeInput): Like {
  const {user, data: {data, createdAt}} = params
  const {hk: targetId, rk: target} = data
  const {id: userId, ...userOmitId} = user
  const entity = EEntity.Like
  const hk = targetId
  const rk = keys.rk.like.stringify({entity, target, userId})
  const byUser = keys.byUser.stringify({entity, createdAt})

  return {
    hk,
    rk,
    userId,
    byUser,
    createdAt,
    user: userOmitId,
    data
  }
}

export type CreateLikeInput = {
  data: Pick<LikeInput, 'createdAt'> & {
    data: Post | Comment
  }
  user: Member
}
export interface Like extends YiguanaDocument {
  userId: string
  byUser: string
  user: Omit<User, 'id'>
  data: Post|Comment
}
