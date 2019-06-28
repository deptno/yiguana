import {DynamoDbApiInput, EType} from './common'
import {get} from '../../../dynamodb/common'

export function post(params: DynamoDbApiInput & GetPostInput) {
  const {tableName, id, client} = params
  return get(client, {
    TableName: tableName,
    Key: {
      id,
      range: EType.Post
    }
  })
}

export type GetPostInput = {
  id: string
}
