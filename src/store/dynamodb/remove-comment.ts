import {DynamoDBInput} from '../../entity/input/dynamodb'

export async function removeComment(operator: DynamoDBInput, params: RemoveCommentInput) {
  const {dynamodb, tableName} = operator
  const {hk} = params
  const rk = 'comment'
  const response = await dynamodb.update({
    ReturnConsumedCapacity: 'TOTAL',
    TableName             : tableName,
    Key                   : {
      hk,
      rk
    },
    UpdateExpression: 'SET deleted = :d',
    ExpressionAttributeValues: {
      ':d': true
    }
  })
  if (response) {
    if (response.ConsumedCapacity) {
      const wcu = response.ConsumedCapacity.CapacityUnits
      console.log({wcu})
    }
  }

  return Boolean(response)
}
export type RemoveCommentInput = {
  hk: string
}
