import {DynamoDbApiInput, TableIndex, UserDocument} from './common'
import {del} from '../../../dynamodb/common'

export async function remove(params: DynamoDbApiInput & RemoveInput): Promise<UserDocument | undefined> {
  const {client, tableName, id, range} = params
  const response = await del(client, {
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues          : 'ALL_OLD',
    TableName             : tableName,
    Key                   : {
      id,
      range
    },
  })
  if (response) {
    return response.Attributes as UserDocument
  }
}

export type RemoveInput = Pick<TableIndex, 'id'|'range'>
