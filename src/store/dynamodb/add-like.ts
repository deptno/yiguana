import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Like} from '../../entity/like'

export function addLike(operator: DynamoDBInput, params: AddLikeInput) {
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

export type AddLikeInput = {
  data: Like
}