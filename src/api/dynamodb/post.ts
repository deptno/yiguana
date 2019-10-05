import {EType} from './common'
import {DynamoDBInput} from '../../entity/input/dynamodb'

export function post(operator: DynamoDBInput, params: PostInput) {
  const {dynamodb, tableName} = operator
  const {hk} = params

  return dynamodb.get({
    TableName: tableName,
    Key: {
      hk,
      rk: EType.Post
    }
  })
}

export type PostInput = {
  hk,
}
