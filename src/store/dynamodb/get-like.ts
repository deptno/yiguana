import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {Member} from '../../entity/user'
import {LikeInput} from '../../entity/like/user-input'

export async function getLike(operator: DynamoDBInput, params: GetLikeInput) {
  const {dynamodb, tableName} = operator
  const {user, data} = params
  const {entity, targetId, createdAt} = data

  const response = await dynamodb.get({
    TableName: tableName,
    Key: {
      rk: EEntity.Like,
      like: [user.id, entity, targetId].join('#'),
    },
  })
  console.log({response})
  return Boolean(response)
}

export type GetLikeInput = {
  data: LikeInput
  user: Member
}
