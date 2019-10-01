import {EType} from './common'
import {PostsInput} from './posts'
import {DynamoDBInput} from '../../entity/input/dynamodb'

export function post(operator: DynamoDBInput, params: PostInput) {
  const {dynamodb, tableName} = operator
  const {id} = params

  return dynamodb.get({
    TableName: tableName,
    Key: {
      hk: id,
      rk: EType.Post
    }
  })
}

export type PostInput = {
  id,
}
