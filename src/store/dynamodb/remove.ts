import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'

export async function remove(operator: DynamoDBInput, params: RemoveInput): Promise<any | undefined> {
  const {dynamodb, tableName} = operator
  const {hk, rk} = params
  const response = await dynamodb.del({
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues: 'ALL_OLD',
    TableName: tableName,
    Key: {
      hk,
      rk,
    },
  })

  if (response) {
    return response.Attributes as any
  }
}

export type RemoveInput = {
  hk: string,
  rk: EEntity
}
