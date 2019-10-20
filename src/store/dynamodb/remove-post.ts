import {DynamoDBInput} from '../../entity/input/dynamodb'

export async function removePost(operator: DynamoDBInput, params: RemovePostInput) {
  const {dynamodb, tableName} = operator
  const {hk} = params
  const rk = 'post'
  // FIXME: update 삭제
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
  return Boolean(response)
}
export type RemovePostInput = {
  hk: string
}
