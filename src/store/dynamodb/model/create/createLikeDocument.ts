import {keys} from '../../../../dynamodb/keys'

export function createLikeDocument(params: Input): Yiguana.LikeDocument {
  const {user, data: {data, createdAt}} = params
  const {hk: targetId, rk: target} = data
  const {id: userId} = user
  const entity = Yiguana.EntityType.Like
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

type Input = {
  data: {
    data: Yiguana.LikeableEntity
    createdAt: string
  }
  user: Yiguana.Member
}
