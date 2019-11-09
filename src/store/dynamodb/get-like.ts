import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Member} from '../../entity/user'
import {LikeInput} from '../../entity/like/user-input'
import {Like} from '../../entity/like'
import {keys} from '../../dynamodb/keys'
import {EEntity} from '../../entity/enum'

export async function getLike<T = Like>(operator: DynamoDBInput, params: GetLikeInput) {
  const {dynamodb, tableName} = operator
  const {user, data} = params
  const {targetId, entity} = data
  const hk = targetId
  const rk = keys.rk.like.stringify({
    entity: EEntity.Like,
    target: entity,
    userId: user.id,
  })

  return dynamodb.get<T>({
    TableName: tableName,
    Key: {
      hk,
      rk,
    },
  })
}

export type GetLikeInput = {
  data: Omit<LikeInput, 'createdAt'>
  user: Member
}
