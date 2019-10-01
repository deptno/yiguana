import {DynamoDBInput} from '../../entity/input/dynamodb'

export async function removePost(operator: DynamoDBInput, params: RemovePostInput) {
  const {dynamodb, tableName} = operator
  const {id} = params
  const rk = 'post'
  // fixme update 삭제
  const response = await dynamodb.del({
    ReturnConsumedCapacity: 'TOTAL',
    TableName             : tableName,
    Key                   : {
      id,
      rk
    }
  })
  if (response) {
    if (response.ConsumedCapacity) {
      const wcu = response.ConsumedCapacity.CapacityUnits
//      console.log({wcu})
    }
  }
  return Boolean(response)
}
export type RemovePostInput = {
  id: string
}
