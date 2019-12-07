import {DynamoDBInput} from '../../entity/input/dynamodb'
import {keys} from '../../dynamodb/keys'
import {Post} from '../../entity/post'
import {Comment} from '../../entity/comment'
import {EEntity} from '../../type'
import {logStoreDdb} from '../../lib/log'

export function removeLike(operator: DynamoDBInput, input: RemoveLikeInput) {
  logStoreDdb('removeLike input %j', input)

  const {dynamodb, tableName} = operator
  const {data, userId} = input

  return dynamodb.del(
    {
      TableName: tableName,
      Key: {
        hk: data.hk,
        rk: keys.rk.like.stringify({
          entity: EEntity.Like,
          target: data.rk,
          userId: userId
        }),
      },
      ReturnValues: 'ALL_OLD',
    },
  )
}

export type RemoveLikeInput = {
  data: Pick<Post|Comment, 'hk'|'rk'>
  userId: string
}