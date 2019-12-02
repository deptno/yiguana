import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocumentHashRange} from '../../type'

export async function remove(operator: DynamoDBInput, params: RemoveInput): Promise<any | undefined> {
  const {dynamodb, tableName} = operator
  const {hk, rk} = params.data
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
  data: YiguanaDocumentHashRange
}
