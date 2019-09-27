import {CreateApiInput, TableIndex, UserDocument} from './common'

export async function remove(operator: CreateApiInput, params: RemoveInput): Promise<UserDocument | undefined> {
  const {dynamodb, tableName} = operator
  const {hk, rk} = params
  const response = await dynamodb.del({
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues          : 'ALL_OLD',
    TableName             : tableName,
    Key                   : {
      hk,
      rk,
    },
  })

  if (response) {
    return response.Attributes as UserDocument
  }
}

export type RemoveInput = Pick<TableIndex, 'hk' | 'rk'>
