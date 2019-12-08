import {Member, User} from '../user'
import {LikeInput} from './user-input'
import {keys} from '../../dynamodb/keys'
import {Post} from '../post'
import {Comment, Reply} from '../comment'
import {EEntity, YiguanaDocument} from '../../type'

export function createLike<T extends Post | Comment | Reply>(params: CreateLikeInput<T>): Like {
  const {user, data: {data, createdAt}} = params
  const {hk: targetId, rk: target} = data
  const {id: userId} = user
  const entity = EEntity.Like
  const hk = targetId
  const rk = keys.rk.like.stringify({entity, target, userId})
  const byUser = keys.byUser.like.stringify({entity, createdAt})

  return {
    hk,
    rk,
    userId,
    byUser,
    createdAt,
    user,
    data,
  }
}

export type CreateLikeInput<T extends Post | Comment | Reply> = {
  data: Pick<LikeInput, 'createdAt'> & {
    data: T
  }
  user: Member
}
export interface Like extends YiguanaDocument {
  userId: string
  byUser: string
  user: User
  data: Post | Comment | Reply
}
