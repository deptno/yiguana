import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Like} from '../../entity/like'

export function removeLike(operator: DynamoDBInput, params: RemoveLikeInput) {
  const {dynamodb, tableName} = operator
  const {data} = params
  const {hk, rk} = data

  return dynamodb.del(
    {
      TableName: tableName,
      Key: {
        hk,
        rk,
      },
      ReturnValues: 'ALL_OLD',
    },
  )
}

export type RemoveLikeInput = {
  data: Pick<Like, 'hk'|'rk'>
}