import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Like} from '../../entity/like'
import {YiguanaDocumentHashRange} from '../../dynamodb'
import {keys} from '../../dynamodb/keys'
import {EEntity} from '../../entity/enum'
import {Post} from '../../entity/post'
import {Comment} from '../../entity/comment'

//TODO: remove 로 따로 빼라 필요가 있음
export function removeLike(operator: DynamoDBInput, params: RemoveLikeInput) {
  const {dynamodb, tableName} = operator
  const {data, userId} = params

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