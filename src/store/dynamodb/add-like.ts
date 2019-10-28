import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Like} from '../../entity/like'

export async function addLike(operator: DynamoDBInput, params: LikeInput) {
  const {dynamodb, tableName} = operator
  const {data} = params

  return dynamodb.put<Like>(
    {
      TableName: tableName,
      Item: dynamodb.util.js2DdbDoc(data),
      ReturnValues: 'ALL_OLD',
    },
  )
}

export type LikeInput = {
  data: Like
}