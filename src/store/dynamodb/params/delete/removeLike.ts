import {keys} from '../../../../dynamodb/keys'
import {logStoreDdb} from '../../../../lib/log'

export function removeLike(tableName: string, input: Input) {
  logStoreDdb('removeLike input %j', input)

  const {data, userId} = input

  return {
    TableName: tableName,
    Key: {
      hk: data.hk,
      rk: keys.rk.like.stringify({
        entity: Yiguana.EntityType.Like,
        target: data.rk,
        userId: userId,
      }),
    },
    ReturnValues: 'ALL_OLD',
  }
}

export type Input = {
  data: Yiguana.Document
  userId: string
}