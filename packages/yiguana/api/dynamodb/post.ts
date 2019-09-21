import {CreateApiInput, EType} from './common'
import {get} from '../../../dynamodb/common'

export function post(params: CreateApiInput & GetPostInput) {
  const {tableName, id, dynamodb} = params
  return get(dynamodb, {
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
