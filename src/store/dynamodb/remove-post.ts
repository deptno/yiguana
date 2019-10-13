import {DynamoDBInput} from '../../entity/input/dynamodb'

export async function removePost(operator: DynamoDBInput, params: RemovePostInput) {
  const {dynamodb, tableName} = operator
  const {hk} = params
  const rk = 'post'
  // fixme update 삭제
  const response = await dynamodb.update({
    ReturnConsumedCapacity: 'TOTAL',
    TableName             : tableName,
    Key                   : {
      hk,
      rk
    },
    UpdateExpression: [
      'SET dCategory = category, deleted = :d',
      'REMOVE category'
    ].join(' '),
    ExpressionAttributeValues: {
      ':d': true
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
  hk: string
}
