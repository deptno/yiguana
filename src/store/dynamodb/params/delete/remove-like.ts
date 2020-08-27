import {{dynamodb, tableName}} from '..//input/dynamodb'
import {keys} from '../../../../dynamodb/keys'
import {logStoreDdb} from '../../../../lib/log'

export function removeLike(operator: {dynamodb, tableName}, input: RemoveLikeInput) {
  logStoreDdb('removeLike input %j', input)

  const {dynamodb, tableName} = operator
  const {data, userId} = input

  return dynamodb.del(
    {
      TableName: tableName,
      Key: {
        hk: data.hk,
        rk: keys.rk.like.stringify({
          entity: Yiguana.EntityType.Like,
          target: data.rk,
          userId: userId
        }),
      },
      ReturnValues: 'ALL_OLD',
    },
  )
}

export type RemoveLikeInput = {
  data: Yiguana.Document
  userId: string
}