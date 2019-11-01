import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Member} from '../../entity/user'
import {LikeInput} from '../../entity/like/user-input'
import {Like} from '../../entity/like'
import {keys} from '../../dynamodb/keys'
import {EEntity} from '../../entity/enum'

export async function getLike<T = Like>(operator: DynamoDBInput, params: GetLikeInput) {
  const {dynamodb, tableName} = operator
  const {user, data} = params
  const {targetId} = data
  const hk = keys.hk.like.stringify({
    targetId,
    userId: user.id,
  })

  return dynamodb.get<T>({
    TableName: tableName,
    Key: {
      hk,
      rk: EEntity.Like
    },
  })
}

export type GetLikeInput = {
  data: Pick<LikeInput, 'targetId'>
  user: Member
}
