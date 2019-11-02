import {YiguanaDocument} from '../../dynamodb/yiguana-document'
import {Member} from '../user'
import {LikeInput} from './user-input'
import {EEntity} from '../enum'
import {keys} from '../../dynamodb/keys'

export function createLike(params: CreateLikeInput): Like {
  const {user, data} = params
  const {entity, targetId, createdAt} = data
  const {id: userId} = user
  const hk = keys.hk.like.stringify({
    targetId,
    userId,
  })
  const like = keys.like.stringify({
    userId,
    entity,
    targetId,
    createdAt
  })

  console.log(
    {
      rk: EEntity.Like,
      hk,
      like,
      createdAt,
    }
  )
  return {
    rk: EEntity.Like,
    hk,
    like,
    createdAt,
  }
}

export type CreateLikeInput = {
  data: LikeInput
  user: Member
}
export interface Like extends YiguanaDocument {
  rk: EEntity.Like
  like: string
}
