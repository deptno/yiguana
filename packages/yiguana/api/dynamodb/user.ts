import {DynamoDbApiInput, EType, UserDocument} from './common'
import {get} from '../../../dynamodb/common'
import {createRangeKey} from './key/range'

export async function user(params: DynamoDbApiInput & UserInput): Promise<UserDocument|undefined> {
  const {client, tableName, user} = params
  const {id, range = createRangeKey(EType.User)} = user
  const response = await get<UserDocument>(client, {
    ReturnConsumedCapacity   : 'TOTAL',
    TableName                : tableName,
    Key                      : {
      id,
      range
    },
  })
  return response
}

export type UserInput = {
  user: Pick<UserDocument, 'id' | 'range'>
}
